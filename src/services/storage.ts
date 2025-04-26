import { BlockedSite, BlockedSitesState } from '../types/index.js';

/**
 * Serviço para gerenciar o armazenamento de sites bloqueados
 *
 * Este serviço utiliza a Chrome Storage API para persistir os dados
 * e fornece métodos para adicionar, remover e recuperar sites bloqueados
 */
export class StorageService {
  /**
   * Obtém todos os sites bloqueados do storage
   * @returns Promise com o objeto contendo todos os sites bloqueados
   */
  static async getBlockedSites(): Promise<BlockedSitesState> {
    return new Promise(resolve => {
      chrome.storage.local.get(['blockedSites'], result => {
        // Se não existirem sites bloqueados, retorna um objeto vazio
        resolve(result.blockedSites || {});
      });
    });
  }

  /**
   * Salva o estado atual dos sites bloqueados no storage
   * @param blockedSites Objeto com todos os sites bloqueados
   * @returns Promise que resolve quando a operação for concluída
   */
  static async saveBlockedSites(blockedSites: BlockedSitesState): Promise<void> {
    return new Promise(resolve => {
      chrome.storage.local.set({ blockedSites }, () => {
        resolve();
      });
    });
  }

  /**
   * Adiciona um novo site à lista de bloqueados
   * @param domain Nome do domínio a ser bloqueado
   * @param durationMs Duração do bloqueio em milissegundos
   * @returns Promise que resolve com o site bloqueado adicionado
   */
  static async addBlockedSite(domain: string, durationMs: number): Promise<BlockedSite> {
    const blockedSites = await this.getBlockedSites();

    // Cria um novo objeto de site bloqueado
    const now = Date.now();
    const newBlockedSite: BlockedSite = {
      domain,
      startTime: now,
      endTime: now + durationMs,
    };

    // Adiciona o site ao objeto de sites bloqueados
    blockedSites[domain] = newBlockedSite;

    // Salva a atualização no storage
    await this.saveBlockedSites(blockedSites);

    return newBlockedSite;
  }

  /**
   * Remove um site da lista de bloqueados
   * @param domain Nome do domínio a ser removido
   * @returns Promise que resolve quando a operação for concluída
   */
  static async removeBlockedSite(domain: string): Promise<void> {
    const blockedSites = await this.getBlockedSites();

    // Verifica se o site existe na lista de bloqueados
    if (blockedSites[domain]) {
      // Remove o site do objeto
      delete blockedSites[domain];

      // Salva a atualização no storage
      await this.saveBlockedSites(blockedSites);
    }
  }

  /**
   * Verifica se um domínio está bloqueado no momento atual
   * @param domain Nome do domínio a ser verificado
   * @returns Promise que resolve com true se o site estiver bloqueado, false caso contrário
   */
  static async isBlocked(domain: string): Promise<boolean> {
    const blockedSites = await this.getBlockedSites();
    const site = blockedSites[domain];

    // Verifica se o site existe e se ainda está dentro do período de bloqueio
    if (site && site.endTime > Date.now()) {
      return true;
    }

    // Se o site existe mas o tempo expirou, remove-o da lista
    if (site) {
      await this.removeBlockedSite(domain);
    }

    return false;
  }

  /**
   * Limpa todos os sites bloqueados expirados
   * @returns Promise que resolve quando a operação for concluída
   */
  static async cleanExpiredSites(): Promise<void> {
    const blockedSites = await this.getBlockedSites();
    const now = Date.now();
    let hasChanges = false;

    // Verifica cada site bloqueado
    Object.keys(blockedSites).forEach(domain => {
      if (blockedSites[domain].endTime <= now) {
        delete blockedSites[domain];
        hasChanges = true;
      }
    });

    // Se houve alterações, salva o novo estado
    if (hasChanges) {
      await this.saveBlockedSites(blockedSites);
    }
  }

  /**
   * Obtém o tempo restante de bloqueio para um domínio em milissegundos
   * @param domain Nome do domínio
   * @returns Promise que resolve com o tempo restante ou 0 se não estiver bloqueado
   */
  static async getRemainingTime(domain: string): Promise<number> {
    const blockedSites = await this.getBlockedSites();
    const site = blockedSites[domain];

    if (site) {
      const remainingTime = site.endTime - Date.now();
      return Math.max(0, remainingTime);
    }

    return 0;
  }
}

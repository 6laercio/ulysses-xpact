import { BlockedSite, BlockedSitesState, Message, Response } from './types/index.js';
import { StorageService } from './services/storage.js';

console.info('Ulysses xPact - Iniciado');

// Estrutura em memória para gerenciar bloqueios
let blockedSites: BlockedSitesState = {};

/**
 * Função para extrair o domínio de uma URL
 * @param url URL a ser processada
 * @returns Domínio extraído
 */
function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    console.error('URL inválida:', url, error);
    return '';
  }
}

// Listener para quando uma página é carregada
chrome.webNavigation.onBeforeNavigate.addListener(
  async function (details) {
    // Apenas processar o frame principal (ignorar iframes)
    if (details.frameId !== 0) return;

    const domain = extractDomain(details.url);

    if (!domain) return;

    // Verificar se o site está bloqueado
    const isBlocked = await StorageService.isBlocked(domain);

    if (isBlocked) {
      console.info(`Site bloqueado detectado: ${domain}`);
      // Este código será expandido na fase 3 para redirecionar para a página de bloqueio
      // Por enquanto, apenas logamos
    }
  },
  { url: [{ schemes: ['http', 'https'] }] }
);

/**
 * Inicializa a extensão carregando os sites bloqueados do storage
 */
async function initialize() {
  try {
    // Carregar sites bloqueados do armazenamento
    blockedSites = await StorageService.getBlockedSites();
    console.info('Sites bloqueados carregados:', blockedSites);

    // Limpar sites expirados
    await StorageService.cleanExpiredSites();
  } catch (error) {
    console.error('Erro ao inicializar a extensão:', error);
  }
}

// Executar inicialização
initialize();

// Configurar verificação periódica para limpar sites expirados (a cada 5 minutos)
setInterval(
  async () => {
    await StorageService.cleanExpiredSites();
  },
  5 * 60 * 1000
);

// Ouvir mensagens do popup ou outras partes da extensão
chrome.runtime.onMessage.addListener(function (
  message: Message,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: Response<BlockedSite | BlockedSitesState>) => void
) {
  // Processar diferentes tipos de mensagens
  if (message.action === 'blockSite') {
    handleBlockSite(message.domain, message.duration)
      .then(result => {
        sendResponse({ success: true, data: result });
      })
      .catch(error => {
        sendResponse({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        });
      });

    // Retornar true para manter o canal de mensagem aberto
    return true;
  }

  if (message.action === 'getBlockedSites') {
    StorageService.getBlockedSites()
      .then(sites => {
        sendResponse({ success: true, data: sites });
      })
      .catch(error => {
        sendResponse({
          success: false,
          error: error instanceof Error ? error.message : String(error),
        });
      });

    // Retornar true para manter o canal de mensagem aberto
    return true;
  }
});

/**
 * Função para lidar com o bloqueio de um novo site
 * @param domain Domínio a ser bloqueado
 * @param durationMs Duração do bloqueio em milissegundos
 * @returns Promise com o resultado da operação
 */
async function handleBlockSite(domain: string, durationMs: number) {
  try {
    // Adicionar site aos bloqueados
    const result = await StorageService.addBlockedSite(domain, durationMs);

    // Atualizar a cópia em memória
    blockedSites = await StorageService.getBlockedSites();

    console.info(`Site bloqueado: ${domain} por ${durationMs / (60 * 1000)} minutos`);
    return result;
  } catch (error) {
    console.error('Erro ao bloquear site:', error);
    throw error;
  }
}

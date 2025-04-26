import { BlockedSitesState, Response, BlockedSite } from '../types/index.js';

document.addEventListener('DOMContentLoaded', function (): void {
  // Obter a aba atual
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];

    if (!currentTab.url) {
      return;
    }

    const url = new URL(currentTab.url);
    const domain = url.hostname;

    // Mostrar apenas o domínio
    const urlElement = document.getElementById('current-url');
    if (urlElement) {
      urlElement.textContent = domain;
    }

    // Configurar o botão de bloqueio
    const blockButton = document.getElementById('block-site');
    if (blockButton) {
      blockButton.addEventListener('click', function (): void {
        // Bloquear o site por 1 hora (3600000 ms)
        blockSite(domain, 3600000);
      });
    }

    // Carregar a lista de sites bloqueados
    loadBlockedSites();
  });
});

/**
 * Envia uma mensagem para o background script para bloquear um site
 * @param domain Domínio a ser bloqueado
 * @param duration Duração do bloqueio em milissegundos
 */
function blockSite(domain: string, duration: number): void {
  chrome.runtime.sendMessage(
    { action: 'blockSite', domain, duration },
    undefined,
    function (response: Response<BlockedSite>): void {
      if (response && response.success) {
        console.info('Site bloqueado com sucesso:', domain);

        // Atualizar a interface para mostrar o novo site bloqueado
        loadBlockedSites();
      } else {
        console.error('Erro ao bloquear site:', response ? response.error : 'Resposta inválida');
      }
    }
  );
}

/**
 * Carrega e exibe a lista de sites bloqueados
 */
function loadBlockedSites(): void {
  chrome.runtime.sendMessage(
    { action: 'getBlockedSites' },
    undefined,
    function (response: Response<BlockedSitesState>): void {
      if (response && response.success) {
        const blockedSites = response.data as BlockedSitesState;
        displayBlockedSites(blockedSites);
      } else {
        console.error(
          'Erro ao carregar sites bloqueados:',
          response ? response.error : 'Resposta inválida'
        );
      }
    }
  );
}

/**
 * Exibe a lista de sites bloqueados no popup
 * @param blockedSites Objeto com os sites bloqueados
 */
function displayBlockedSites(blockedSites: BlockedSitesState): void {
  const blockedListElement = document.getElementById('blocked-list');

  if (!blockedListElement) return;

  // Limpar conteúdo atual
  blockedListElement.innerHTML = '';

  const domains = Object.keys(blockedSites);

  if (domains.length === 0) {
    // Exibir mensagem se não houver sites bloqueados
    blockedListElement.innerHTML = '<p>Nenhum site bloqueado no momento.</p>';
    return;
  }

  // Criar lista de sites bloqueados
  const now = Date.now();

  domains.forEach(domain => {
    const site = blockedSites[domain];
    const remainingTime = Math.max(0, site.endTime - now);

    if (remainingTime <= 0) {
      // Ignorar sites com tempo expirado (eles serão limpos pelo background script)
      return;
    }

    // Criar elemento para o site bloqueado
    const siteElement = document.createElement('div');
    siteElement.className = 'blocked-site-item';

    // Adicionar informações do site
    const domainElement = document.createElement('div');
    domainElement.className = 'domain';
    domainElement.textContent = domain;

    const timeElement = document.createElement('div');
    timeElement.className = 'remaining-time';
    timeElement.textContent = formatRemainingTime(remainingTime);

    // Adicionar ao container
    siteElement.appendChild(domainElement);
    siteElement.appendChild(timeElement);
    blockedListElement.appendChild(siteElement);
  });
}

/**
 * Formata o tempo restante em formato legível
 * @param ms Tempo restante em milissegundos
 * @returns Texto formatado (exemplo: "59m 30s")
 */
function formatRemainingTime(ms: number): string {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor(ms / (1000 * 60 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}

import { BlockedSitesState } from './types/index.js';

console.info('Ulysses xPact - Iniciado');

// Estrutura para gerenciar bloqueios
const blockedSites: BlockedSitesState = {};

// listener pra quando uma pagina é carregada
chrome.webNavigation.onBeforeNavigate.addListener(
  function (details) {
    // Este código será expandido na fase 3
    // Aqui verificar se o site está bloquedo
    console.info('Navegando para: ' + details.url);
  },
  { url: [{ schemes: ['http', 'https'] }] }
);

// Inicialização: carregar sites bloqueados do armazenameto
chrome.storage.local.get(['blockedSites'], function (result) {
  if (result.blockedSites) {
    Object.assign(blockedSites, result.blockedSites);
    console.info('Sites bloqueados carregados:', blockedSites);
  }
});

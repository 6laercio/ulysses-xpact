// background.js - Arquivo inicial basico
console.log("Ulysses xPact - Iniciado");

// Estrutura para gerenciar bloqueios
const blockedSites = {};

// listener pra quando uma pagina é carregada
chrome.webNavigation.onBeforeNavigate.addListener(
  function (details) {
    // Este código será expandido na fase 3
    // aqui verificar se o site está bloquedo
    console.log("Navegando para: " + details.url);
  },
  { url: [{ schemes: ["http", "https"] }] }
);

// Inicialização: carregar sites bloqueados do armazenameto
chrome.storage.local.get(["blockedSites"], function (result) {
  if (result.blockedSites) {
    Object.assign(blockedSites, result.blockedSites);
    console.log("Sites bloqueados carregados:", blockedSites);
  }
});

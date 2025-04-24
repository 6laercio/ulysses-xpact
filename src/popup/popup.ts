document.addEventListener('DOMContentLoaded', function (): void {
  // Obter a aba atual
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];

    if (!currentTab.url) {
      return;
    }

    const url = new URL(currentTab.url);

    // Mostrar apenas o domínio
    const urlElement = document.getElementById('current-url');
    if (urlElement) {
      urlElement.textContent = url.hostname;
    }

    const blockButton = document.getElementById('block-site');
    if (blockButton) {
      blockButton.addEventListener('click', function (): void {
        console.info('Bloquear site:', url.hostname);
        // A implementaçao completa será adicionada em fase posterior
      });
    }
  });
});

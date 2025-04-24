document.addEventListener('DOMContentLoaded', function (): void {
  // Obter informações do site bloqueado via parâmetros de URL
  const urlParams = new URLSearchParams(window.location.search);
  const site = urlParams.get('site');

  if (site) {
    const blockedSiteElement = document.getElementById('blocked-site');
    if (blockedSiteElement) {
      blockedSiteElement.textContent = site;
    }
  }

  // Contador simulado
  const countdownElement = document.getElementById('countdown');
  if (countdownElement) {
    countdownElement.textContent = '01:00:00';
  }
});

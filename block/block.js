// Script básico para a página de bloqueio

document.addEventListener("DOMContentLoaded", function () {
  // Obter informações do site bloqueado via parâmetros de URL
  const urlParams = new URLSearchParams(window.location.search);
  const site = urlParams.get("site");

  if (site) {
    document.getElementById("blocked-site").textContent = site;
  }

  // Contador simulado
  document.getElementById("countdown").textContent = "01:00:00";
});

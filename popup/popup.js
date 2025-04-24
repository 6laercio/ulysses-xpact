// Código básico para exibir a URL atual
document.addEventListener("DOMContentLoaded", function () {
  //Obter a aba atual
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    const url = new URL(currentTab.url);

    // Mostrar apenas o domínio
    document.getElementById("current-url").textContent = url.hostname;

    document
      .getElementById("block-site")
      .addEventListener("click", function () {
        console.log("Bloquear site:", url.hostname);
        // a implementaçao completa será adicionada em fase posterior
      });
  });
});

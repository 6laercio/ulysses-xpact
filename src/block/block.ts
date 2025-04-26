document.addEventListener('DOMContentLoaded', function (): void {
  // Obter informações do site bloqueado via parâmetros de URL
  const urlParams = new URLSearchParams(window.location.search);
  const site = urlParams.get('site');
  const endTime = urlParams.get('endTime');

  // Exibir o nome do site bloqueado
  if (site) {
    const blockedSiteElement = document.getElementById('blocked-site');
    if (blockedSiteElement) {
      blockedSiteElement.textContent = site;
    }
  }

  // Configurar o contador regressivo
  const countdownElement = document.getElementById('countdown');
  if (countdownElement && endTime) {
    // Converter para número
    const endTimeMs = parseInt(endTime, 10);

    // Atualizar o contador a cada segundo
    updateCountdown(countdownElement, endTimeMs);
    const intervalId = setInterval(() => {
      const shouldContinue = updateCountdown(countdownElement, endTimeMs);
      if (!shouldContinue) {
        clearInterval(intervalId);
      }
    }, 1000);
  } else if (countdownElement) {
    // Fallback para casos em que o endTime não é fornecido
    countdownElement.textContent = '01:00:00';
  }
});

/**
 * Atualiza o contador regressivo
 * @param element Elemento HTML para exibir o contador
 * @param endTimeMs Timestamp de término do bloqueio em milissegundos
 * @returns Boolean indicando se o contador deve continuar
 */
function updateCountdown(element: HTMLElement, endTimeMs: number): boolean {
  const now = Date.now();
  const remainingTime = Math.max(0, endTimeMs - now);

  // Formatar o tempo restante
  element.textContent = formatTime(remainingTime);

  // Se o tempo chegou a zero, retorna false para parar o contador
  return remainingTime > 0;
}

/**
 * Formata milissegundos para o formato HH:MM:SS
 * @param ms Tempo em milissegundos
 * @returns String formatada
 */
function formatTime(ms: number): string {
  // Converter para segundos
  let seconds = Math.floor(ms / 1000);

  // Calcular horas, minutos e segundos
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  // Formatar como HH:MM:SS com zeros à esquerda
  const format = (num: number): string => num.toString().padStart(2, '0');
  return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
}

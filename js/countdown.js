// Countdown timer for Jubiläum page
function initCountdown(targetDate, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  function update() {
    const now = new Date().getTime();
    const distance = new Date(targetDate).getTime() - now;

    if (distance < 0) {
      container.innerHTML = '<p style="font-size:1.3rem;font-weight:700;color:var(--color-coral)">Das Jubiläum hat begonnen!</p>';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    container.innerHTML = `
      <div class="countdown-item"><span class="countdown-number">${days}</span><span class="countdown-label">Tage</span></div>
      <div class="countdown-item"><span class="countdown-number">${hours}</span><span class="countdown-label">Stunden</span></div>
      <div class="countdown-item"><span class="countdown-number">${minutes}</span><span class="countdown-label">Minuten</span></div>
      <div class="countdown-item"><span class="countdown-number">${seconds}</span><span class="countdown-label">Sekunden</span></div>
    `;
  }

  update();
  setInterval(update, 1000);
}

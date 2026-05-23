// --- Conversion Urgency Countdown Timer ---
const countdownElement = document.getElementById('countdown-timer');

if (countdownElement) {
  // Set initial time (47 minutes, 32 seconds)
  let totalSeconds = (47 * 60) + 32;

  const updateTimer = () => {
    // Calculate hours, minutes, seconds
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format with leading zeros
    const format = (num) => String(num).padStart(2, '0');

    // Update DOM
    countdownElement.innerText = `[${format(hours)}:${format(minutes)}:${format(seconds)}]`;

    // Stop at zero or decrement
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      countdownElement.innerText = "[OFFER EXPIRED]";
      countdownElement.style.color = "var(--text-muted)";
    } else {
      totalSeconds--;
    }
  };

  // Run immediately, then every second
  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}
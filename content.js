(function() {
  let speedDisplay;

  function injectStyles() {
    const link = document.createElement('link');
    link.href = chrome.runtime.getURL('styles.css');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  function createSpeedDisplay() {
    speedDisplay = document.createElement('div');
    speedDisplay.id = 'tempo-speed-display';
    document.body.appendChild(speedDisplay);
  }

  function updateSpeedDisplay(speed) {
    if (!speedDisplay) createSpeedDisplay();
    speedDisplay.textContent = speed.toFixed(2) + 'x';
    speedDisplay.classList.remove('animate');
    void speedDisplay.offsetWidth; // Trigger reflow
    speedDisplay.classList.add('animate');
  }

  function handleKeydown(event) {
    const video = document.querySelector('video');
    if (!video) return;

    if (event.key === 'u') {
      video.playbackRate = Math.min(video.playbackRate + 0.25, 16);
      updateSpeedDisplay(video.playbackRate);
    } else if (event.key === 'y') {
      video.playbackRate = Math.max(video.playbackRate - 0.25, 0.25);
      updateSpeedDisplay(video.playbackRate);
    }
  }

  injectStyles();
  document.addEventListener('keydown', handleKeydown);
})();

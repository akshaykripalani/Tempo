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
    // Check if the active element is an input, textarea, or has contenteditable attribute
    const activeElement = document.activeElement;
    const isEditable = activeElement.tagName === 'INPUT' || 
                       activeElement.tagName === 'TEXTAREA' || 
                       activeElement.isContentEditable;

    // If we're in an editable field, don't intercept the keypress
    if (isEditable) return;

    // Try multiple selectors that YouTube might use
    const video = document.querySelector('video.html5-main-video') || 
                 document.querySelector('.html5-video-player video') ||
                 document.querySelector('video');
                 
    if (!video) return;

    if (event.key === 'u') {
      video.playbackRate = Math.min(video.playbackRate + 0.25, 16);
      updateSpeedDisplay(video.playbackRate);
    } else if (event.key === 'y') {
      video.playbackRate = Math.max(video.playbackRate - 0.25, 0.25);
      updateSpeedDisplay(video.playbackRate);
    }
  }

  // Wait for the video player to be ready
  function init() {
    injectStyles();
    if (document.querySelector('video')) {
      document.addEventListener('keydown', handleKeydown);
    } else {
      // If video isn't found, retry after a short delay
      setTimeout(init, 1000);
    }
  }

  init();
})();
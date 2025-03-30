
// Neural Sync Headlines and Text Animation Utilities
export const createHolographicEffect = (element: HTMLElement) => {
  if (!element) return;
  
  const text = element.innerText;
  element.innerHTML = '';
  element.style.position = 'relative';
  element.style.display = 'inline-block';
  
  // Split text into characters
  [...text].forEach((char, index) => {
    const span = document.createElement('span');
    span.innerText = char;
    span.style.position = 'relative';
    span.style.display = 'inline-block';
    span.style.transition = 'transform 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67)';
    span.style.transformOrigin = 'center';
    span.dataset.index = index.toString();
    
    // Random initial state for assembly animation
    if (Math.random() > 0.5) {
      span.style.transform = `translate(${(Math.random() * 20) - 10}px, ${(Math.random() * 20) - 10}px) rotate(${(Math.random() * 30) - 15}deg)`;
      span.style.opacity = '0.5';
    }
    
    element.appendChild(span);
  });
  
  // Assemble the fragments on scroll or after a delay
  setTimeout(() => {
    Array.from(element.children).forEach((span: Element) => {
      const htmlSpan = span as HTMLElement;
      htmlSpan.style.transform = 'none';
      htmlSpan.style.opacity = '1';
    });
  }, 100);
  
  // Add hover effect
  element.addEventListener('mouseover', () => {
    Array.from(element.children).forEach((span: Element) => {
      const htmlSpan = span as HTMLElement;
      const index = Number(htmlSpan.dataset.index);
      
      htmlSpan.style.transform = `translateY(${Math.sin(index * 0.3) * 10}px) scale(${1 + Math.sin(index * 0.5) * 0.2})`;
      htmlSpan.style.color = `hsl(${(index * 15) % 360}, 100%, 70%)`;
      htmlSpan.style.filter = 'drop-shadow(0 0 5px currentColor)';
      htmlSpan.style.zIndex = '5';
    });
  });
  
  element.addEventListener('mouseout', () => {
    Array.from(element.children).forEach((span: Element) => {
      const htmlSpan = span as HTMLElement;
      htmlSpan.style.transform = 'none';
      htmlSpan.style.color = '';
      htmlSpan.style.filter = '';
      htmlSpan.style.zIndex = '';
    });
  });
};

// Data Corruption Effect for messages
export const createGlitchEffect = (element: HTMLElement) => {
  if (!element) return;
  
  const originalText = element.innerText;
  let isGlitching = false;
  
  element.addEventListener('mouseover', () => {
    if (isGlitching) return;
    isGlitching = true;
    
    const glitchInterval = setInterval(() => {
      const glitchedText = originalText
        .split('')
        .map((char, idx) => {
          // Preserve important content by not glitching all characters
          if (idx % 4 === 0 && Math.random() > 0.7) {
            return ['0', '1', '$', '#', '%', '&', '+', '-', '*', '?'][Math.floor(Math.random() * 10)];
          }
          return char;
        })
        .join('');
      
      element.innerText = glitchedText;
    }, 100);
    
    // Store the interval in an attribute for cleanup
    element.dataset.glitchInterval = String(glitchInterval);
  });
  
  element.addEventListener('mouseout', () => {
    if (!isGlitching) return;
    
    clearInterval(Number(element.dataset.glitchInterval));
    element.innerText = originalText;
    isGlitching = false;
  });
};

// Quantum Ripple Protocol
export const initQuantumRipple = () => {
  const cursor = document.createElement('div');
  cursor.classList.add('quantum-cursor');
  document.body.appendChild(cursor);
  
  let trail: HTMLDivElement[] = [];
  const maxTrailLength = 10;
  
  document.addEventListener('mousemove', (e) => {
    // Update main cursor position
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    
    // Create a new trail element
    const trailDot = document.createElement('div');
    trailDot.classList.add('cursor-trail');
    trailDot.style.left = `${e.clientX}px`;
    trailDot.style.top = `${e.clientY}px`;
    trailDot.style.backgroundColor = `hsl(${Math.random() * 60 + 240}, 100%, 70%)`;
    document.body.appendChild(trailDot);
    
    // Add to trail array
    trail.push(trailDot);
    
    // Remove old trail elements
    if (trail.length > maxTrailLength) {
      const removed = trail.shift();
      if (removed) {
        removed.classList.add('trail-fade');
        setTimeout(() => {
          document.body.removeChild(removed);
        }, 500);
      }
    }
  });
  
  // Add black hole effect to buttons
  const buttons = document.querySelectorAll('button, a, .btn');
  buttons.forEach(btn => {
    btn.addEventListener('mouseover', () => {
      btn.classList.add('black-hole-active');
      document.body.classList.add('warp-background');
    });
    
    btn.addEventListener('mouseout', () => {
      btn.classList.remove('black-hole-active');
      document.body.classList.remove('warp-background');
    });
  });
};

// Cyberspace Weather System
let weatherActive = false;
export const initCyberspaceWeather = () => {
  if (weatherActive) return;
  weatherActive = true;
  
  // Create container for weather effects
  const weatherContainer = document.createElement('div');
  weatherContainer.classList.add('cyberspace-weather');
  document.body.appendChild(weatherContainer);
  
  // Random weather type
  const weatherType = Math.random() > 0.5 ? 'neon-rain' : 'emoji-meteor';
  
  if (weatherType === 'neon-rain') {
    // Generate random neon rain drops
    for (let i = 0; i < 50; i++) {
      createRaindrop(weatherContainer);
    }
    
    // Continue creating raindrops at intervals
    const rainInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        createRaindrop(weatherContainer);
      }
    }, 300);
    
    // Cleanup after some time
    setTimeout(() => {
      clearInterval(rainInterval);
      
      // Fade out and remove
      weatherContainer.classList.add('weather-fade-out');
      setTimeout(() => {
        document.body.removeChild(weatherContainer);
        weatherActive = false;
      }, 3000);
    }, 30000); // Weather lasts for 30 seconds
  } else {
    // Emoji meteor shower
    weatherContainer.classList.add('emoji-meteor-container');
    
    const emojis = ['✨', '🔥', '💫', '⚡', '🌟', '💥', '🚀', '👾', '🤖', '🔮'];
    
    const meteorInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        createEmojiMeteor(weatherContainer, emojis);
      }
    }, 600);
    
    // Add click event to "shoot" meteors
    weatherContainer.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('emoji-meteor')) {
        target.classList.add('emoji-meteor-shot');
        target.addEventListener('animationend', () => {
          if (target.parentNode) {
            target.parentNode.removeChild(target);
          }
        });
      }
    });
    
    // Cleanup after some time
    setTimeout(() => {
      clearInterval(meteorInterval);
      
      // Fade out and remove
      weatherContainer.classList.add('weather-fade-out');
      setTimeout(() => {
        document.body.removeChild(weatherContainer);
        weatherActive = false;
      }, 3000);
    }, 20000); // Weather lasts for 20 seconds
  }
};

// Helper function to create raindrop
function createRaindrop(container: HTMLElement) {
  const drop = document.createElement('div');
  drop.classList.add('neon-raindrop');
  
  const posX = Math.random() * window.innerWidth;
  const duration = 1 + Math.random() * 3;
  const size = 1 + Math.random() * 5;
  const hue = Math.floor(Math.random() * 60) + 220; // Blue to purple hues
  
  drop.style.left = `${posX}px`;
  drop.style.width = `${size}px`;
  drop.style.height = `${size * (5 + Math.random() * 15)}px`;
  drop.style.animationDuration = `${duration}s`;
  drop.style.backgroundColor = `hsla(${hue}, 100%, 70%, 0.7)`;
  
  container.appendChild(drop);
  
  // Remove drop after animation
  drop.addEventListener('animationend', () => {
    // Create ripple effect
    createRipple(container, posX, window.innerHeight - 20);
    
    // Remove the raindrop
    container.removeChild(drop);
  });
}

// Helper function to create ripple effect
function createRipple(container: HTMLElement, x: number, y: number) {
  const ripple = document.createElement('div');
  ripple.classList.add('neon-ripple');
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  
  const hue = Math.floor(Math.random() * 60) + 220; // Blue to purple hues
  ripple.style.borderColor = `hsla(${hue}, 100%, 70%, 0.5)`;
  
  container.appendChild(ripple);
  
  // Remove ripple after animation
  ripple.addEventListener('animationend', () => {
    container.removeChild(ripple);
  });
}

// Helper function to create emoji meteor
function createEmojiMeteor(container: HTMLElement, emojis: string[]) {
  const meteor = document.createElement('div');
  meteor.classList.add('emoji-meteor');
  
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  meteor.innerText = emoji;
  
  const posX = Math.random() * window.innerWidth;
  const posY = -50;
  const size = 24 + Math.random() * 24;
  
  meteor.style.left = `${posX}px`;
  meteor.style.top = `${posY}px`;
  meteor.style.fontSize = `${size}px`;
  
  container.appendChild(meteor);
  
  // Remove meteor after animation or if it goes out of view
  meteor.addEventListener('animationend', () => {
    if (container.contains(meteor)) {
      container.removeChild(meteor);
    }
  });
}

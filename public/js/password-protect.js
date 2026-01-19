/**
 * Password protection for the Switzerland trip site.
 * Blocks casual access - not cryptographically secure.
 */
(function() {
  const STORAGE_KEY = 'switzerland_unlocked';
  const PASSWORD = 'SwissMiss2026$';
  
  // Check if already unlocked this session
  if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
    return;
  }
  
  // Hide the page content until password is entered
  document.documentElement.style.visibility = 'hidden';
  
  function showLockScreen() {
    const lockScreen = document.createElement('div');
    lockScreen.id = 'lock-screen';
    lockScreen.innerHTML = `
      <div class="lock-container">
        <div class="lock-visual">
          <svg class="lock-mountains" viewBox="0 0 200 60" fill="none">
            <path d="M0 60 L40 20 L60 35 L100 5 L140 35 L160 25 L200 60 Z" fill="rgba(255,255,255,0.08)"/>
            <path d="M0 60 L30 35 L50 45 L80 25 L120 50 L150 30 L200 60 Z" fill="rgba(255,255,255,0.04)"/>
          </svg>
        </div>
        <span class="lock-eyebrow">January 2026</span>
        <h1 class="lock-title">Switzerland</h1>
        <p class="lock-subtitle">Ray & Katie</p>
        <form id="lock-form">
          <input 
            type="password" 
            id="lock-password" 
            class="lock-input" 
            placeholder="Enter passcode"
            autocomplete="off"
            autofocus
          >
          <button type="submit" class="lock-button">Continue</button>
        </form>
        <p class="lock-error" id="lock-error">Not quite. Try again.</p>
      </div>
    `;
    
    const styles = document.createElement('style');
    styles.textContent = `
      #lock-screen {
        position: fixed;
        inset: 0;
        z-index: 99999;
        background: linear-gradient(170deg, #1a202c 0%, #0f1419 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        overflow: hidden;
      }
      
      .lock-container {
        text-align: center;
        padding: 2rem;
        max-width: 340px;
        width: 100%;
        position: relative;
      }
      
      .lock-visual {
        margin-bottom: 2.5rem;
      }
      
      .lock-mountains {
        width: 200px;
        height: 60px;
        opacity: 0.8;
      }
      
      .lock-eyebrow {
        display: block;
        font-size: 0.6875rem;
        font-weight: 500;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.4);
        margin-bottom: 0.75rem;
      }
      
      .lock-title {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: clamp(2.5rem, 10vw, 3.5rem);
        font-weight: 400;
        color: #f8f8f6;
        margin: 0;
        letter-spacing: -0.02em;
        line-height: 1;
      }
      
      .lock-subtitle {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 1.125rem;
        color: rgba(248, 248, 246, 0.5);
        margin: 0.75rem 0 3rem;
        font-style: italic;
      }
      
      #lock-form {
        display: flex;
        flex-direction: column;
        gap: 0.875rem;
      }
      
      .lock-input {
        background: rgba(255, 255, 255, 0.06);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        padding: 1rem 1.25rem;
        font-size: 1rem;
        color: #f8f8f6;
        text-align: center;
        letter-spacing: 0.15em;
        transition: all 0.2s ease;
        outline: none;
      }
      
      .lock-input::placeholder {
        color: rgba(248, 248, 246, 0.3);
        letter-spacing: 0.05em;
      }
      
      .lock-input:focus {
        border-color: rgba(201, 168, 124, 0.5);
        background: rgba(255, 255, 255, 0.08);
      }
      
      .lock-button {
        background: #c9a87c;
        border: none;
        border-radius: 8px;
        padding: 0.9375rem 1.5rem;
        font-size: 0.8125rem;
        font-weight: 600;
        color: #1a1a1a;
        cursor: pointer;
        transition: all 0.2s ease;
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }
      
      .lock-button:hover {
        background: #d4b88a;
        transform: translateY(-1px);
      }
      
      .lock-button:active {
        transform: translateY(0);
      }
      
      .lock-error {
        margin-top: 1rem;
        font-size: 0.8125rem;
        color: #b06565;
        opacity: 0;
        transition: opacity 0.2s ease;
      }
      
      .lock-error.visible {
        opacity: 1;
      }
      
      .lock-input.shake {
        animation: shake 0.4s ease;
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-6px); }
        40%, 80% { transform: translateX(6px); }
      }
      
      @media (max-width: 480px) {
        .lock-container {
          padding: 1.5rem;
        }
        
        .lock-title {
          font-size: 2.5rem;
        }
      }
    `;
    
    document.head.appendChild(styles);
    document.body.insertBefore(lockScreen, document.body.firstChild);
    document.documentElement.style.visibility = 'visible';
    
    const form = document.getElementById('lock-form');
    const input = document.getElementById('lock-password');
    const error = document.getElementById('lock-error');
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (input.value === PASSWORD) {
        sessionStorage.setItem(STORAGE_KEY, 'true');
        lockScreen.style.transition = 'opacity 0.5s ease';
        lockScreen.style.opacity = '0';
        setTimeout(() => lockScreen.remove(), 500);
      } else {
        input.classList.add('shake');
        error.classList.add('visible');
        input.value = '';
        setTimeout(() => input.classList.remove('shake'), 400);
      }
    });
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showLockScreen);
  } else {
    showLockScreen();
  }
})();

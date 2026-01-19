/**
 * Simple password protection for the Switzerland trip site.
 * Not cryptographically secure, but blocks casual access.
 */
(function() {
  const STORAGE_KEY = 'switzerland_unlocked';
  const PASSWORD = 'SwissMiss2026$';
  
  // Check if already unlocked this session
  if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
    return; // Already verified, show the page normally
  }
  
  // Hide the page content and show password screen
  document.documentElement.style.visibility = 'hidden';
  
  document.addEventListener('DOMContentLoaded', function() {
    // Create the lock screen
    const lockScreen = document.createElement('div');
    lockScreen.id = 'lock-screen';
    lockScreen.innerHTML = `
      <div class="lock-container">
        <div class="lock-icon">🇨🇭</div>
        <h1 class="lock-title">Switzerland 2026</h1>
        <p class="lock-subtitle">This trip is just for us ♡</p>
        <form id="lock-form">
          <input 
            type="password" 
            id="lock-password" 
            class="lock-input" 
            placeholder="Enter passcode"
            autocomplete="off"
            autofocus
          >
          <button type="submit" class="lock-button">Enter</button>
        </form>
        <p class="lock-hint" id="lock-error" style="display: none; color: #e74c3c;">
          That's not it—try again!
        </p>
      </div>
    `;
    
    // Add styles
    const styles = document.createElement('style');
    styles.textContent = `
      #lock-screen {
        position: fixed;
        inset: 0;
        z-index: 99999;
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      .lock-container {
        text-align: center;
        padding: 3rem 2rem;
        max-width: 360px;
        width: 100%;
      }
      
      .lock-icon {
        font-size: 4rem;
        margin-bottom: 1.5rem;
        animation: float 3s ease-in-out infinite;
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      
      .lock-title {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 2.5rem;
        font-weight: 400;
        color: #faf8f5;
        margin: 0 0 0.5rem;
        letter-spacing: 0.02em;
      }
      
      .lock-subtitle {
        font-size: 1rem;
        color: rgba(250, 248, 245, 0.6);
        margin: 0 0 2rem;
        font-style: italic;
      }
      
      #lock-form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      
      .lock-input {
        background: rgba(255, 255, 255, 0.08);
        border: 2px solid rgba(255, 255, 255, 0.15);
        border-radius: 12px;
        padding: 1rem 1.25rem;
        font-size: 1.125rem;
        color: #faf8f5;
        text-align: center;
        letter-spacing: 0.1em;
        transition: all 0.2s ease;
        outline: none;
      }
      
      .lock-input::placeholder {
        color: rgba(250, 248, 245, 0.4);
        letter-spacing: 0.05em;
      }
      
      .lock-input:focus {
        border-color: #d4a574;
        background: rgba(255, 255, 255, 0.12);
      }
      
      .lock-button {
        background: linear-gradient(135deg, #d4a574 0%, #c49a6c 100%);
        border: none;
        border-radius: 12px;
        padding: 1rem;
        font-size: 1rem;
        font-weight: 600;
        color: #1a1a2e;
        cursor: pointer;
        transition: all 0.2s ease;
        text-transform: uppercase;
        letter-spacing: 0.15em;
      }
      
      .lock-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(212, 165, 116, 0.3);
      }
      
      .lock-button:active {
        transform: translateY(0);
      }
      
      .lock-hint {
        margin-top: 1rem;
        font-size: 0.875rem;
      }
      
      .lock-input.shake {
        animation: shake 0.5s ease;
      }
      
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-8px); }
        40%, 80% { transform: translateX(8px); }
      }
    `;
    
    document.head.appendChild(styles);
    document.body.insertBefore(lockScreen, document.body.firstChild);
    document.documentElement.style.visibility = 'visible';
    
    // Handle form submission
    const form = document.getElementById('lock-form');
    const input = document.getElementById('lock-password');
    const error = document.getElementById('lock-error');
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (input.value === PASSWORD) {
        // Success! Store and reveal the page
        sessionStorage.setItem(STORAGE_KEY, 'true');
        lockScreen.style.transition = 'opacity 0.4s ease';
        lockScreen.style.opacity = '0';
        setTimeout(() => lockScreen.remove(), 400);
      } else {
        // Wrong password
        input.classList.add('shake');
        error.style.display = 'block';
        input.value = '';
        setTimeout(() => input.classList.remove('shake'), 500);
      }
    });
  });
})();

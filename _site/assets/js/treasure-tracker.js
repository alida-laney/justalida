// Treasure Tracker - Manages discovered hidden content
class TreasureTracker {
  constructor() {
    this.storageKey = 'discoveredTreasures';
    this.treasures = this.loadTreasures();
    this.initializeTracker();
  }

  loadTreasures() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : {};
  }

  saveTreasures() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.treasures));
  }

  unlockTreasure(contentId, title) {
    this.treasures[contentId] = {
      title: title,
      unlockedAt: new Date().toISOString(),
      url: window.location.pathname
    };
    this.saveTreasures();
    this.showUnlockNotification(title);
    this.updateTreasureCount();
  }

  isUnlocked(contentId) {
    return this.treasures.hasOwnProperty(contentId);
  }

  getTreasureCount() {
    return Object.keys(this.treasures).length;
  }

  showUnlockNotification(title) {
    // Create a temporary notification
    const notification = document.createElement('div');
    notification.className = 'treasure-notification';
    notification.innerHTML = `
      <span class="treasure-icon">💎</span>
      <span>Treasure unlocked: "${title}"</span>
    `;
    document.body.appendChild(notification);

    // Style the notification
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: '#4a90e2',
      color: 'white',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      zIndex: '1000',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      animation: 'slideInRight 0.5s ease-out'
    });

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
      setTimeout(() => document.body.removeChild(notification), 500);
    }, 5000);
  }

  updateTreasureCount() {
    const counters = document.querySelectorAll('.treasure-counter');
    const count = this.getTreasureCount();
    counters.forEach(counter => {
      counter.textContent = count;
      if (count > 0) {
        counter.style.display = 'inline';
        counter.parentElement.style.display = 'inline';
        
        // Make the treasure counter a link to the treasure map
        const badge = counter.parentElement;
        if (!badge.href) {
          badge.innerHTML = `<a href="/treasure-map/" title="View your treasure map">${badge.innerHTML}</a>`;
          badge.style.textDecoration = 'none';
        }
      }
    });
  }

  initializeTracker() {
    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
      .treasure-counter-badge {
        display: none;
        font-size: 0.8em;
        color: #4a90e2;
        font-weight: bold;
      }
      .treasure-icon {
        font-size: 1.2em;
      }
    `;
    document.head.appendChild(style);

    // Initialize treasure counter display
    setTimeout(() => this.updateTreasureCount(), 100);
  }

  // Method for protected content to call when unlocked
  static unlock(contentId, title) {
    if (window.treasureTracker) {
      window.treasureTracker.unlockTreasure(contentId, title);
    }
  }
}

// Initialize the tracker when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  window.treasureTracker = new TreasureTracker();
});

// Add treasure counter to navigation (call this from layouts)
function addTreasureCounter() {
  const nav = document.querySelector('.site-nav .trigger');
  if (nav && !document.querySelector('.treasure-counter-badge')) {
    const badge = document.createElement('span');
    badge.className = 'treasure-counter-badge';
    badge.innerHTML = '💎 <span class="treasure-counter">0</span>';
    nav.appendChild(badge);
  }
}
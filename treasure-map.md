---
layout: page
title: "Treasure Map"
permalink: /treasure-map/
---

<div id="treasure-map" class="treasure-map">
  <h1>🗺️ Your Treasure Map</h1>
  
  <div id="no-treasures" class="no-treasures">
    <p>This page appears to be empty... Perhaps you haven't discovered any hidden treasures yet?</p>
    <p>Look for subtle clues throughout the site. Sometimes a word is more than just a word.</p>
    <p><em>When you need a moment of calm in the digital storm, seek [sanctuary](/hidden-sanctuary/).</em></p>
  </div>

  <div id="discovered-treasures" class="discovered-treasures" style="display: none;">
    <p>Welcome, fellow explorer! Here are the hidden treasures you've discovered:</p>
    
    <div id="treasure-list" class="treasure-list">
      <!-- Treasures will be populated by JavaScript -->
    </div>
    
    <div class="treasure-stats">
      <p><strong>Progress:</strong> <span id="treasure-count">0</span> treasures discovered</p>
      <p><em>There are more secrets hidden throughout the site. Keep exploring!</em></p>
    </div>

    <div class="treasure-hints">
      <h3>🔍 Explorer's Notes</h3>
      <ul id="hint-list">
        <!-- Hints will be added based on progress -->
      </ul>
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  displayTreasureMap();
});

function displayTreasureMap() {
  // Wait for treasure tracker to initialize
  setTimeout(() => {
    if (window.treasureTracker) {
      const treasures = window.treasureTracker.treasures;
      const count = Object.keys(treasures).length;
      
      if (count > 0) {
        document.getElementById('no-treasures').style.display = 'none';
        document.getElementById('discovered-treasures').style.display = 'block';
        
        // Update treasure count
        document.getElementById('treasure-count').textContent = count;
        
        // Populate treasure list
        const treasureList = document.getElementById('treasure-list');
        treasureList.innerHTML = '';
        
        Object.entries(treasures).forEach(([id, treasure]) => {
          const treasureItem = document.createElement('div');
          treasureItem.className = 'treasure-item';
          treasureItem.innerHTML = `
            <div class="treasure-header">
              <span class="treasure-icon">💎</span>
              <h3><a href="${treasure.url}">${treasure.title}</a></h3>
            </div>
            <p class="treasure-date">Discovered: ${new Date(treasure.unlockedAt).toLocaleDateString()}</p>
          `;
          treasureList.appendChild(treasureItem);
        });
        
        // Add progressive hints
        addProgressiveHints(count);
      }
    }
  }, 100);
}

function addProgressiveHints(count) {
  const hintList = document.getElementById('hint-list');
  const hints = [];
  
  if (count >= 1) {
    hints.push("You've found your first treasure! Look for more hidden links in poems and stories.");
  }
  
  if (count >= 2) {
    hints.push("Two treasures discovered! You're getting the hang of this. Some riddles are about concepts, others about concrete answers.");
  }
  
  if (count >= 3) {
    hints.push("Three or more! You're a true explorer. There may be treasures hidden behind other types of puzzles...");
  }
  
  hintList.innerHTML = hints.map(hint => `<li>${hint}</li>`).join('');
}
</script>

<style>
.treasure-map {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.no-treasures {
  text-align: center;
  color: #666;
  padding: 3rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin: 2rem 0;
}

.discovered-treasures {
  margin-top: 2rem;
}

.treasure-list {
  margin: 2rem 0;
}

.treasure-item {
  background-color: #f0f8ff;
  border-left: 4px solid #4a90e2;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 4px;
}

.treasure-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.treasure-header h3 {
  margin: 0;
  color: #4a90e2;
}

.treasure-header h3 a {
  text-decoration: none;
  color: inherit;
}

.treasure-header h3 a:hover {
  text-decoration: underline;
}

.treasure-icon {
  font-size: 1.2em;
}

.treasure-date {
  margin: 0.5rem 0 0 0;
  color: #666;
  font-size: 0.9em;
}

.treasure-stats {
  background-color: #e8f5e8;
  padding: 1rem;
  border-radius: 4px;
  margin: 2rem 0;
  color: #2e7d32;
}

.treasure-hints {
  background-color: #fff8e1;
  padding: 1rem;
  border-radius: 4px;
  border-left: 4px solid #ffb300;
}

.treasure-hints h3 {
  margin-top: 0;
  color: #ff8f00;
}

.treasure-hints ul {
  margin-bottom: 0;
}
</style>
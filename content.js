function createOverlay(siteName) {
    // Capitalize first letter
    const capitalizedSite = siteName.charAt(0).toUpperCase() + siteName.slice(1);
    
    const overlay = document.createElement('div');
    overlay.className = 'site-overlay';
    overlay.innerHTML = `
      <div class="overlay-content">
        <h1>Sorry, ${capitalizedSite} isn't <br> available right now</h1>
        <p>A law banning ${capitalizedSite} has been enacted in the U.S. <br> Unfortunately, that means you can't use ${capitalizedSite} for now. <br><br>
  
  We are fortunate that President Trump has indicated that he will work with us on a solution to reinstate ${capitalizedSite} once he takes office. <br> Please stay tuned!</p>
        <div class="overlay-buttons">
          <button class="learn-more">Learn more</button>
          <button class="close-overlay">Close</button>
        </div>
      </div>
    `;
    
  
      document.body.appendChild(overlay);
    
      // Add click handlers for both buttons to redirect to x.com/strwbcom
      overlay.querySelector('.learn-more').addEventListener('click', () => {
        window.location.href = 'https://x.com/strwbcom';
      });
    
      overlay.querySelector('.close-overlay').addEventListener('click', () => {
        window.location.href = 'https://x.com/strwbcom';
      });
    }
    
    // Check if current site is in blocked list
    chrome.storage.sync.get(['sites'], (result) => {
      const sites = (result.sites || '').split('\n')
        .map(s => s.trim())
        .filter(s => s); // Remove empty lines
      
      const currentHost = window.location.hostname;
      
      // More precise matching: check if the current hostname exactly matches or ends with any of the sites
      if (sites.some(site => {
        if (currentHost === site || currentHost.endsWith('.' + site)) {
          // Extract the base domain name without subdomains
          const baseSite = site.split('.')[0];
          createOverlay(baseSite);
          return true;
        }
        return false;
      })) {
        // Site matched and overlay created
      }
    });
  
  
document.addEventListener('DOMContentLoaded', () => {
    // Load saved sites
    chrome.storage.sync.get(['sites'], (result) => {
      document.getElementById('sites').value = result.sites || '';
    });
  
    // Save sites and close popup
    document.getElementById('save').addEventListener('click', () => {
      const sites = document.getElementById('sites').value;
      chrome.storage.sync.set({ sites }, () => {
        // Close the popup after saving
        window.close();
      });
    });
  });
  
  
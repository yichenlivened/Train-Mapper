'use strict';

//service worker
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js').then(function () {
    console.log('serviceWorker registered.');
  }).catch(function (error) {
    console.log('Error on registering service worker:' + error);
  });

  // Listen for claiming of our ServiceWorker
  navigator.serviceWorker.addEventListener('controllerchange', function(event) {
    // Listen for changes in the state of our ServiceWorker
    navigator.serviceWorker.controller.addEventListener('statechange', function() {
      // If the ServiceWorker becomes "activated", let the user know they can go offline!
      if (this.state === 'activated') {
        // Show the "You may now use offline" notification
        document.getElementById('offlineNotification').classList.remove('hidden');
      }
    });
  });

} else {
  console.log('Service Worker is not supported in this browser.');
}

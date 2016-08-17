'use strict';

//service worker
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js').then(function () {
    console.log('serviceWorker registered.');
  }).catch(function (error) {
    console.log('Error on registering service worker:' + error);
  });
} else {
  console.log('Service Worker is not supported in this browser.');
}

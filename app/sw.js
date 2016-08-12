// var staticCacheName = 'train-mapper-static-v1';
//
// self.addEventListener('install', function(event) {
//   event.waitUntil(
//     caches.open(staticCacheName).then(function(cache) {
//       return cache.addAll([
//         '/',
//         '/styles/main.css'
//       ]);
//     })
//   );
// });
//
// self.addEventListener('activate', function(event){
//   event.waitUntil(
//     caches.keys().then(function(cacheNames){
//       return Promise.all(
//         cacheNames.filter(function(cacheName){
//           return cacheName.startsWith('train-mapper-static-') && cacheName != staticCacheName;
//         }).map(function(cacheName){
//           return cache.delete(cacheName);
//         })
//       );
//     })
//   )
// });
//
// self.addEventListener('fetch', function(event){
//     event.respondWith(
//       caches.match(event.request).then(function(response){
//         if(!response){
//           console.log('Uncached: ' + event.request.url);
//         }
//           if(response){
//             console.log('Cached: ' + response.url);
//             return response;
//           }
//           return fetch(event.request);
//         })
//     );
// });

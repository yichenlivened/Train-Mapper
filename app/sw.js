var staticCacheName = 'train-mapper-static-v1';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/fonts/glyphicons-halflings-regular.eot',
        '/fonts/glyphicons-halflings-regular.svg',
        '/fonts/glyphicons-halflings-regular.ttf',
        '/fonts/glyphicons-halflings-regular.woff',
        '/fonts/glyphicons-halflings-regular.woff2',
        // '/bower_components/modernizr/modernizr.js',
        // '/bower_components/jquery/dist/jquery.js',
        // '/bower_components/lovefield/dist/lovefield.js',
        // '/bower_components/bootstrap-sass/assets/javascripts/bootstrap/affix.js',
        // '/bower_components/bootstrap-sass/assets/javascripts/bootstrap/alert.js',
        // '/bower_components/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js',
        // '/bower_components/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js',
        // '/bower_components/bootstrap-sass/assets/javascripts/bootstrap/modal.js',
        // '/bower_components/bootstrap-sass/assets/javascripts/bootstrap/transition.js',
        // '/bower_components/bootstrap-sass/assets/javascripts/bootstrap/button.js',
        // '/bower_components/bootstrap-sass/assets/javascripts/bootstrap/popover.js',
        // '/bower_components/bootstrap-sass/assets/javascripts/bootstrap/carousel.js',
        // '/bower_components/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js',
        // '/bower_components/bootstrap-sass/assets/javascripts/bootstrap/collapse.js',
        // '/bower_components/bootstrap-sass/assets/javascripts/bootstrap/tab.js',
        // '/scripts/service-worker.js ',
        // '/scripts/databse.js',
        // '/scripts/model.js',
        // '/scripts/view.js',
        // '/scripts/controller.js',
        '/scripts/vendor/modernizr.js',
        '/scripts/main.js',
        '/scripts/plugins.js',
        '/scripts/vendor.js',
        '/styles/main.css',
        '/index.html',
        '/favicon.ico'
      ]);
    })
  );
});

self.addEventListener('activate', function(event){
  event.waitUntil(
    caches.keys().then(function(cacheNames){
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName.startsWith('train-mapper-static-') && cacheName != staticCacheName;
        }).map(function(cacheName){
          return cache.delete(cacheName);
        })
      );
    })
  )
});

self.addEventListener('fetch', function(event){
    event.respondWith(
      caches.match(event.request).then(function(response){
        if(!response){
          console.log('Uncached: ' + event.request.url);
        }
          if(response){
            console.log('Cached: ' + response.url);
            return response;
          }
          return fetch(event.request);
        })
    );
});

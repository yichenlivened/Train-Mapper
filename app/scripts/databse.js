(function(){
  'use strict';

  if (!navigator.serviceWorker) return;

  navigator.serviceWorker.register('/sw.js').then(function() {
    console.log('Registration worked!');
  }).catch(function() {
    console.log('Registration failed!');
  });

  fetch('/').then(function(response){
    return response;
  }).then(function(data){
    console.log(data);
  }).catch(function(){
    console.log('failed');
  });

  var GTFSfiles = [
      'calendar',
      'calendar_dates',
  ];
  fetch('/data/agency.txt').then(function(response){
    return response.text();
  }).then(function(data){
    console.log(data);
  }).catch(function(){
    console.log('failed');
  });

})();

(function() {
  'use strict';


  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js', {scope: '/'}).then(function(registration) {
      document.querySelector('#status').textContent = 'succeeded';
    }).catch(function(error) {
      document.querySelector('#status').textContent = error;
    });
  } else {
    // The current browser doesn't support service workers.
    var aElement = document.createElement('a');
    aElement.href = 'http://www.chromium.org/blink/serviceworker/service-worker-faq';
    aElement.textContent = 'unavailable';
    document.querySelector('#status').appendChild(aElement);
  }

  angular
    .module('app')
    .factory('dataService', dataService);

  dataService.$inject = ['$http'];

  function dataService($http) {
    var db;

    indexedDB.open("TrainMapperDatabase")
    .onerror = function(event) {
        console.log(event);
      }
    .onsuccess = function(event) {
      db = event.target.result;
    };

    return {
        trainSchedule: trainSchedule
    };

    function trainSchedule(){
      return $http.get('/gtfs/stops.txt')
        .then(getComplete)
        .catch(getFailed);

      function getComplete(response){
        return response;
      }

      function getFailed(error){
        console.log('XHR Failed for get train schedule.' + error.data);
      }
    }
  }
})();

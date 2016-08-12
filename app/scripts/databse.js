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

//indexedDB
if (!window.indexedDB) {
  console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
} else {
  const DB_NAME = 'train-mapper';
  const DB_VERSION = 1;
  var db;

  function openDB() {
    console.log("openDb ...");
    var req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = function (evt) {
      db = this.result;
      console.log("openDb DONE");
    };
    req.onerror = function (evt) {
      console.error("openDb:", evt.target.errorCode);
    };
  }
}

function txtToArray(txt) {
  var array = [];
  var tmp;
  var arrMatches = txt.match(/[^\r\n]+/g);
  var parameterNames = arrMatches.shift().split(',');
  arrMatches.forEach(function (arrMatch) {
    tmp = {};
    arrMatch = arrMatch.split(',');
    arrMatch.forEach(function (data, index) {
      tmp[parameterNames[index]] = data;
    });
    array.push(tmp);
  });
  return array;
}

var GTFS;

GTFS = function () {
  this.filesName = ['calendar', 'calendar_dates', 'stop_times', 'stops', 'trips']
  this.filesData = {};
};

GTFS.prototype.filePath = function (fileName) {
  return '/data/' + fileName + '.txt';
};

GTFS.prototype.getData = function () {
  var self = this;
  self.filesName.forEach(function (fileName) {
    fetch(self.filePath(fileName)).then(function (res) {
      return res.text();
    }).then(function (data) {
      self.filesData[fileName] = txtToArray(data);
    }).catch(function (error) {
      console.log('Error: ', error);
    });
  });
  console.log(self.filesData);
};


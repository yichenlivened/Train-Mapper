'use strict';

var controller;

controller = {
  init: function () {
    var TM = new GTFS();
    TM.getDBConnection().then(function(db) {
      console.log('Database connected & Schema creation done successfully');

      // Load stops for users to select for departure and arrival stops
      // Use setTimeout() to delay make sure insertDate is done beforehand

      console.log('Loading info...');

      setTimeout(function () {
        TM.retrieveStops()
          .then(function (stops) {
            view.init(stops);
          })
          .catch(function (error) {
            console.log('Stops retrieving errors: ', error);
          });
      }, 200);
    });
  }
};




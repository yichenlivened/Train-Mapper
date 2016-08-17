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
  },
  getSchedule: function(data, departure_stop, arrival_stop){
    // Organize Departure to Arrival station
    var schedules = [];
    var departureData = null;
    var arrivalData = null;
    // A set of departure, arrival, and duration of trip
    var scheduleObject = {};

    for (var i = 0; data.length > i; i++) {
      // Sort to get the data of departure or arrival
      if (data[i].stops.stop_name === departure_stop) {
        departureData = data[i].stop_times;
        continue;
      } else {
        arrivalData = data[i].stop_times;
      }

      if (departureData &&
        arrivalData &&
        departureData.trip_id === arrivalData.trip_id &&
        departureData.departure_time < arrivalData.arrival_time) {
        scheduleObject = {
          'departure': departureData.departure_time,
          'arrival': arrivalData.arrival_time,
          // Calculate duration of trips between departure and arrival
          'duration': getDuration(departureData.departure_time, arrivalData.arrival_time)
        };
        schedules.push(scheduleObject);
        departureData = null;
        scheduleObject = null;
      }
    }
    return schedules;
  }
};




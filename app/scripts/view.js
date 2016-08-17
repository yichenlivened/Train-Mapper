'use strict';

var view;

view = {
  formList: [{
    name: 'trainSchedule',
    inputs: [{
      name : 'departure',
      dataFrom: 'stops',
      placeholder: 'enter your departure station'
    },{
      name : 'arrive',
      dataFrom: 'stops',
      placeholder: 'enter your arrive station'
    }
    ]
  }],
  init: function (stops) {
    var self = this;
    self.stops = stops;
    self.$main = $('#main');
    self.formList.forEach(function(form){
      self.initForm(form.name, form.inputs);
    })
  },
  initForm: function(name, inputs){
    var self = this;
    self['$form-' + name] = $('<div/>',{
      'id': name
    }).appendTo(self.$main);
    inputs.forEach(function(input){
      self.initInput(input, name);
    });
  },
  initInput: function(input, formName){
    var self = this;
    self[input.name + 'Val'] = null;
    var html =
      '<label for="input-' + input.name +'">' + input.name + ': </label>' +
      '<input id="input-' + input.name +'" list="' + input.name + '-list"' + 'placeholder="' + input.placeholder+ '">' +
      '<datalist id="' + input.name + '-list">'+ self.getOptions(view.stops) + '</datalist>';

    self['$input-' + input.name] = $('<div/>',{
      'class': 'form-group',
      'html': html
    }).appendTo(self['$form-' + formName]);
    self.addListener(input.name);
  },
  getOptions: function(stops){
    var html = '';
    stops.forEach(function(stop){
      html += '<option value="' + stop.stop_name + '">'
    });
    return html;
  },
  addListener: function(input){
    var self = this;
    $('#input-' + input).on('input', function(){
      var opt = $('option[value="'+$(this).val()+'"]');
      var check = true;
      self[input + 'Val'] = opt.val();
      self.formList[0].inputs.forEach(function(input){
        if(self[input.name + 'Val'] === undefined || self[input.name + 'Val'] === null){
          check = false;
        }
      });
      if(check){
        console.log(self['departureVal'], self['arriveVal']);
        TM.searchSchedule(self['departureVal'], self['arriveVal'])
          .then(function(results) {
            self.showSchedule(results, self['departureVal'], self['arriveVal']);
          });
      }
    })
  },
  showSchedule: function(data, departure_stop, arrival_stop){
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

    if (schedules.length > 0) {
      // Display the matched schedule

      // Sort the schedule order by departure time and display them
      schedules.sort(sortSchedules).forEach(function(info) {
      });

      console.log(schedules);

    } else {

    }

  }
};


/**
 * Helper functions
 */

function getDuration(departure_time, arrival_time) {
  var dSec = hhmmssToSeconds(departure_time);
  var aSec = hhmmssToSeconds(arrival_time);
  var duration = (aSec - dSec) / 60 ;

  return duration.toString() + ' min';
}

function sortSchedules(a, b) {
  if (hhmmssToSeconds(a.departure) > hhmmssToSeconds(b.departure)) {
    return 1;
  } else if(hhmmssToSeconds(a.departure) < hhmmssToSeconds(b.departure)) {
    return -1;
  } else {
    return 0;
  }
}


function hhmmssToSeconds(time) {
  var t = time.split(':');
  var hour = parseInt(t[0]);
  var minute = parseInt(t[1]);
  var second = parseInt(t[2]);

  return hour*60*60 + minute*60 + second;
}

'use strict';

var view;

view = {
  formList: [{
    name: 'trainSchedule',
    inputs: [{
      name : 'departure',
      dataFrom: 'stops',
      placeholder: 'Enter your departure station'
    },{
      name : 'arrive',
      dataFrom: 'stops',
      placeholder: 'Enter your arrive station'
    }
    ]
  }],
  init: function (stops) {
    var self = this;
    self.stops = stops;
    self.$main = $('#main');
    self.formList.forEach(function(form){
      self.initForm(form.name, form.inputs);
    });
    self['$result'] = $('<div/>',{
      'id': 'result'
    }).appendTo(self.$main);
  },
  initForm: function(name, inputs){
    var self = this;
    self['$form-' + name] = $('<form/>',{
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
      '<label for="input-' + input.name +'">' + capitalizeFirstLetter(input.name) + ': </label>' +
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
      self.$result.html('');
      self.formList[0].inputs.forEach(function(input){
        if(self[input.name + 'Val'] === undefined || self[input.name + 'Val'] === null){
          check = false;
        }
      });
      if(check){
        TM.searchSchedule(self['departureVal'], self['arriveVal'])
          .then(function(results) {
            self.showResult(controller.getSchedule(results, self['departureVal'], self['arriveVal']));
         });
      }
    })
  },
  showResult:function(schedules){
    var self = this;
    self.$result.html('');
    if (schedules.length > 0) {
      //init result table
      self['$table-result'] = $('<table/>',{
        'id': 'table-result',
        'class':'table'
      }).appendTo(self.$result);
      self['$table-result'].html('<thead><tr>' +
        '<th>Departure</th>' +
        '<th>Arrive Time</th>' +
        '<th>Duration</th>' +
        '</tr></thead>'
        );
      self['$search-result'] = $('<tbody/>',{
        'id': 'search-result'
      }).appendTo(self['$table-result']);
      // Display the matched schedule
      // Sort the schedule order by departure time and display them
      schedules.sort(sortSchedules).forEach(function(info) {
        self['$search-result'].append(
          '<tr>' +
          '<td>' + info.departure +'</td>' +
          '<td>' + info.arrival +'</td>' +
          '<td>' + info.duration +'</td>' +
          '</tr>');
      });
    } else{
      self['$table-result'] = $('<p/>',{
        'class':'',
        'html':'No result.'
      }).appendTo(self.$result);
    }
  }
};


/**
 * Helper functions
 */

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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

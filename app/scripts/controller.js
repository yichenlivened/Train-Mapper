'use strict';

var controller;

controller = {
  init: function () {
    var self = this;
    self.filesName = ['calendar', 'calendar_dates', 'stop_times', 'stops', 'trips'];
    self.gtfs = new GTFS;
    self.gtfs.getData('stops').then(function(res){
      self.gtfs['stops'] = self.gtfs.txtToArray(res);
      view.init();
    });
  }
};




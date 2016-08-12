'use strict';

var model, controller, view;

model = {
  init: function () {
    var gtfs = new GTFS;
    gtfs.getData();
  }
};

controller = {
  init: function () {
    model.init();
    view.init();
  }
};

view = {
  init: function () {
  }
}

controller.init();



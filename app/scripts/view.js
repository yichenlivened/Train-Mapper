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
  init: function () {
    var self = this;
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
    var options = controller.gtfs['stops'];
    var html =
      '<label for="input-' + input.name +'">' + input.name + ': </label>' +
      '<input id="input-' + input.name +'" list="' + input.name + '-list"' + 'placeholder="' + input.placeholder+ '">' +
      '<datalist id="' + input.name + '-list">'+ self.getOptions(options) + '</datalist>';

    self['$input-' + input.name] = $('<div/>',{
      'class': 'form-group',
      'html': html
    }).appendTo(self['$form-' + formName]);
    self.addListener(input.name);
  },
  getOptions: function(inputs){
    var html = '';
    var options = [];
    inputs.forEach(function(input){
        options.push(input.stop_name);
    });
    options = options.sort().filter(function(item, pos, ary) {
      return !pos || item != ary[pos - 1];
    });
    options.forEach(function(option){
      html += '<option value="' + option + '">'
    });
    return html;
  },
  addListener: function(input){
    $('#input-' + input).on('input', function(){
      var opt = $('option[value="'+$(this).val()+'"]');
      console.log(opt.val());
    })
  }
};

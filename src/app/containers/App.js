angular
  .module('app')
  .component('app', {
    templateUrl: 'app/containers/App.html',
    controller: App
  });

function App(dataService) {
  this.todos = [initialTodo];
  this.filter = SHOW_ALL;

  dataService.trainSchedule().then(function(data){
    console.log(CSVToArray(data.data));
  });

  function CSVToArray(strData){
    var arrData = [];
    var tmp = {};
    var arrMatches = strData.match(/[^\r\n]+/g);
    var parametersName = arrMatches.shift().split(',');

    arrMatches.forEach(function(match){
      tmp = {};
      match = match.split(',');
      parametersName.forEach(function(parameter, index){
        tmp[parameter] = match[index];
      });
      arrData.push(tmp);
    });

    // Return the parsed data.
    return arrData;
  }

}

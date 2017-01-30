// controller for game collection
var app = angular.module('gameMon.search', ['ui.materialize']);
app.controller('SearchController', function($scope){
  $scope.search = {};
  $scope.search.results = {};
  for(var i = 0; i < 5; i++){
    $scope.search.results[i] = 'Hello';
    $scope.search.results[i].deck = 'Hi';
  };
});
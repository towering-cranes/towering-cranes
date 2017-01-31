// controller for game collection
var app = angular.module('gameMon.gameCollection', ['ui.materialize']);
app.controller('GameCollectionController', function($scope) {
  $scope.data = {};
  $scope.data.games = {};
  for(var i = 0; i < 5; i++){
    $scope.data.games[i] = 'Hello';
  };
});
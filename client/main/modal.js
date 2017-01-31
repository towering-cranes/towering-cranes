// controller for modal
var app = angular.module('gameMon.modal', ['ui.materialize']);
app.controller('ModalController', function($scope){
  $scope.data = {};
  $scope.data.similarGames = {};
  for(var i = 0; i < 5; i++){
    $scope.data.similarGames[i] = 'Hello';
  };
});
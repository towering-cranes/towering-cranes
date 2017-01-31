// controller for game collection
var app = angular.module('gameMon.gameCollection', ['ui.materialize']);
app.controller('GameCollectionController', function($scope, giantBomb) {
  $scope.data = {};
  $scope.data.games = {};
  for(var i = 0; i < 5; i++){
    $scope.data.games[i] = 'Hello';
  };

  // giantBomb.searchByTerm('league of legends', function(res) {
  //   console.log(res.data);
  // });

  // giantBomb.searchById(24024, function(res) {
  //   console.log(res.data);
  // });
});

app.factory('giantBomb', ['$http', function($http) {
  var searchTypes = {};

  searchTypes.searchByTerm = function(searchTerm, callback) {
    $http.get('/games/search/keyword/' + searchTerm)
      .then(function(response) {
        callback(response);
      }, failCallback);
  };

  searchTypes.searchById = function(gameId, callback) {
    $http.get('/games/search/id/' + gameId)
      .then(function(response) {
        callback(response);
      }, failCallback);
  };

  var failCallback = function(response) {
    console.log(response);
  };

  return searchTypes;
}]);
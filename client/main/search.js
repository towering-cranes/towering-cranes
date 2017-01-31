// controller for game collection
var app = angular.module('gameMon.search', ['ui.materialize']);
app.controller('SearchController', function($scope, giantBomb) {
  $scope.search = {};
  $scope.search.results = [];
  // for(var i = 0; i < 5; i++){
  //   $scope.search.results[i] = 'Hello';
  //   $scope.search.results[i].deck = 'Hi';
  // };

  giantBomb.searchByTerm('pokemon', function(res) {
    $scope.search.results = res.data;
  });

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
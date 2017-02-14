// controller for viewing another user's collection
var app = angular.module('gameMon.otherCollection', ['ui.materialize', 'gameMon.selectedGame']);
app.controller('OtherCollectionController', function OtherCollectionController($scope, ForeignView, SelectedGame, $rootScope, $routeParams, $location) {
  $scope.data = {}; //stores games
  $scope.username = $routeParams.username//localStorage.profile;
  //Store games in corresponding objects
  if($scope.username === localStorage.name) {
    $location.path('/gamemon');
  };
  $scope.platforms = {};
  $scope.genres = {};
  //Store just names in array
  $scope.platformArr = [];
  $scope.genreArr = [];
  //For filtering
  $scope.setFilter = function(val) {
    $scope.current = val;
  }
  $scope.current = '';

  $scope.selectGame = function(game) {
    SelectedGame.setCurrentGameFromCollection(game);
  };

  var getCollection = function() {
    ForeignView.getUserCollection($routeParams.username, function(res) { //change to $routeParams.username
      //Gets user collection based on username, stores platforms and games in $scope.platforms;
      $scope.data.games = res.data;
      for (var i = 0; i < $scope.data.games.length; i++) {
        var game = $scope.data.games[i];
        //Platforms
        if (game.platforms !== null) {
          for (var j = 0; j < game.platforms.length; j++) {
            var platform = game.platforms[j].name;
            if (!$scope.platforms.hasOwnProperty(platform)) {
              $scope.platforms[platform] = [game];
              $scope.platformArr.push(platform);
            } else {
              $scope.platforms[platform].push(game);
            }
          }
        }
        //Genres
        if (game.genres !== null) {
          for (var k = 0; k < game.genres.length; k++) {
            var genre = game.genres[k].name;
            if (!$scope.genres.hasOwnProperty(genre)) {
              $scope.genres[genre] = [game];
              $scope.genreArr.push(genre);
            } else {
              $scope.genres[genre].push(game);
            }
          }
        }
      }
    });
  };

  getCollection();

});

app.factory('ForeignView', ['$http', function($http) {
  var db = {};

  db.getUserCollection = function(username, callback) {
    $http.get('api/users/games/public/' + username)
      .then(function(response) {
        callback(response);
      }, failCallback);
  };


  var failCallback = function(response) {
    console.log(response);
  };

  return db;
}]);
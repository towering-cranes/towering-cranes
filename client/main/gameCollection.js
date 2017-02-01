// controller for game collection
var app = angular.module('gameMon.gameCollection', ['ui.materialize']);
app.controller('GameCollectionController', function($scope, UserCollection) {
  $scope.data = {};
  $scope.username = 'kevin';
  //Store games in corresponding objects
  $scope.platforms = {};
  $scope.genres = {};
  //Store just names in array
  $scope.platformArr = [];
  $scope.genreArr = [];

  UserCollection.getUserCollection($scope.username, function(res) {
    //Gets user collection, stores platforms and games in $scope.platforms
    $scope.data.games = res.data;
    for (var i = 0; i < $scope.data.games.length; i++) {
      var game = $scope.data.games[i];
      //Platforms
      for (var j = 0; j < game.platforms.length; j++) {
        var platform = game.platforms[j].name;
        if (!$scope.platforms.hasOwnProperty(platform)) {
          $scope.platforms[platform] = [game];
          $scope.platformArr.push(platform);
        } else {
          $scope.platforms[platform].push(game);
        }
      }
      //Genres
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
    console.log($scope.data.games);
  });

  //TODO: Add/remove game to collection after search and modal is implemented


  // userCollection.addGameToCollection($scope.username, 24024, function(res) {
  //   console.log(res.data);
  // });

  // userCollection.removeGameFromCollection($scope.username, 24024, function(res) {
  //   console.log(res.data);
  // });
});

app.factory('UserCollection', ['$http', function($http) {
  var db = {};

  db.getUserCollection = function(username, callback) {
    $http.get('/users/games/' + username)
      .then(function(response) {
        callback(response);
      }, failCallback);
  };

  db.addGameToCollection = function(username, gameId, callback) {
    // Get game obj from game id
    $http.get('/games/search/id/' + gameId)
      .then(function(response) {

        // Attach user to game object for back end processing
        var game = response.data;
        game.username = username;

        $http.post('/games', game)
          .then(function(response) {
            callback(response);
          }, failCallback);

      }, failCallback);
  };

  db.removeGameFromCollection = function(username, gameId, callback) {
    $http.get('/games/search/id/' + gameId)
      .then(function(response) {

        // Attach user to game object for back end processing
        var game = response.data;
        game.username = username;
        console.log(game);

        $http({
          url: '/games',
          method: 'DELETE',
          data: game,
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        })
          .then(function(response) {
            callback(response);
          }, failCallback);

      }, failCallback);
  };

  var failCallback = function(response) {
    console.log(response);
  };

  return db;
}]);


//SAMPLE CUSTOM FILTER
// app.filter('tagFilter', function() {
//   return function (items, classFilter) {
//     if (!items) {
//       return;
//     }
//     var filtered = [];
//     for (var i = 0; i<Object.keys(items).length; i++) {
//       var champ = items[Object.keys(items)[i]];
//       if(champ.tags.indexOf(classFilter) !== -1 || classFilter === '') {
//         filtered.push(champ);
//       }
//     }
//     return filtered;
//   };
// });

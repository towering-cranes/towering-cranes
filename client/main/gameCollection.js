// controller for game collection
var app = angular.module('gameMon.gameCollection', ['ui.materialize']);
app.controller('GameCollectionController', function($scope, userCollection) {
  $scope.data = {};
  $scope.data.games = [];
  $scope.username = 'test';
  // for(var i = 0; i < 5; i++){
  //   $scope.data.games[i] = 'Hello';
  // };

  userCollection.getUserCollection($scope.username, function(res) {
    $scope.data.games = res.data;
  });

  // userCollection.addGameToCollection($scope.username, 24024, function(res) {
  //   console.log(res.data);
  // });

  // userCollection.removeGameFromCollection($scope.username, 24024, function(res) {
  //   console.log(res.data);
  // });
});

app.factory('userCollection', ['$http', function($http) {
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

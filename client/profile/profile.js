// controller for viewing another user's collection  -- currently crashing when you try to load it
var app = angular.module('gameMon.otherCollection', ['ui.materialize', 'gameMon.selectedGame']);
app.controller('OtherCollectionController', function OtherCollectionController($scope, ForeignView, SelectedGame, $rootScope, $routeParams) {
  $scope.data = {}; //stores games
  $scope.username = $routeParams.username//localStorage.profile;
  //$rootScope.username = localStorage.profile;
  //Store games in corresponding objects
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
      //Gets user collection, stores platforms and games in $scope.platforms;
      // Brian: based on $scope.username, which comes from localStorage. We should use this same function to access other users' collecions. But we should have a better way to identify them than their username in the database, which is currently an Auth0 hash. We should be able to search by a simple username.
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
      // console.log($scope.data.games);
    });
  };

  getCollection();
  // UserCollection.addUser({username: $scope.username, password: 'password'}, function(response){
  //   // console.log('User successfully added', $scope.username, typeof $scope.username);
  //   getCollection();
  // });

  // $rootScope.$on('collectionChange', function(event) {
  //   getCollection();
  // });

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

//Collection filter
// app.filter('collectionFilter', function() {
//   return function(items, filterOpt) {
//     if (!items) {
//       //Do nothing if there are no items
//       return;
//     } else if (filterOpt[0] === '' || null) {
//       //Don't filter if nothing is given in filter options
//       return items;
//     } else {
//       var filtered = [];
//       for(var i = 0; i < items.length; i++) {
//         //Input filter
//         if (filterOpt[1] === 'text' && filterOpt[0]) {
//           //Check if input matches title or aliases
//           //Get rid of accent on e for Pokémon case (most common case) and ignore caps

//           //Check title match
//           if (items[i].title.replace(/é/g, 'e').toLowerCase() === filterOpt[0].toLowerCase()){
//             filtered.push(items[i]);
//           } if (items[i].aliases !== null) {
//             if (items[i].aliases.replace(/é/g, 'e').toLowerCase() === filterOpt[0].toLowerCase()) {
//               filtered.push(items[i]);
//             }
//           }
//           //Check if matches franchise
//           if (items[i].franchises) {
//             for (var j = 0; j < items[i].franchises.length; j++) {
//               if (items[i].franchises[j].name.toLowerCase() === filterOpt[0].toLowerCase()) {
//                 filtered.push(items[i]);
//               }
//             }
//           }
//         } //End of input filter

//         //Genre filter
//         if (filterOpt[1] === 'genre') {
//           var genres = items[i].genres;
//           //Check if genre matches filter
//           if (genres !== null) {
//             for (var j = 0; j < genres.length; j++) {
//               if(genres[j].name === filterOpt[0]) {
//                 filtered.push(items[i]);
//               }
//             }
//           }
//         }
//         //Platform filter
//         if (filterOpt[1] === 'platform') {
//           var platforms = items[i].platforms;
//           //Check if platform matches filter
//           if (platforms !== null) {
//             for (var j = 0; j < platforms.length; j++) {
//               if(platforms[j].name === filterOpt[0]) {
//                 filtered.push(items[i]);
//               }
//             }
//           }
//         }
//       }
//       //If nothing was filtered, return all items
//       return filtered.length === 0 ? items : filtered;
//     }
//   };
// });
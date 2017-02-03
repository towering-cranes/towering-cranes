// controller for modal
var app = angular.module('gameMon.modal', ['ui.materialize', 'gameMon.selectedGame', 'gameMon.search', 'gameMon.gameCollection']);

app.controller('ModalController', ['$scope', 'SelectedGame', '$rootScope', 'giantBomb', 'UserCollection', function($scope, SelectedGame, $rootScope, giantBomb, UserCollection) {
  $scope.data = {};
  $scope.similarGames = [];

  // true for add, false for remove
  $scope.inCollection;

  $scope.addGameToCollection = function(giantBombId) {
    UserCollection.addGameToCollection($rootScope.username, giantBombId, function(response) {
      // console.log(response);
      $rootScope.$emit('collectionChange');
    });
    $scope.inCollection = true;
  };
  $scope.removeGameFromCollection = function(giantBombId) {
    UserCollection.removeGameFromCollection($rootScope.username, giantBombId, function(response) {
      // console.log(response);
      $rootScope.$emit('collectionChange');
    });
    $scope.inCollection = false;
  };

  // Game from search is different than collection
  $rootScope.$on('gameChangeSearch', function(event, game) {
    $scope.data = game;
    $scope.similarGames = [];
    $scope.data.image = game.image ? game.image.small_url : null;
    $scope.canAddToCollection = true;
    $scope.data.giantBombId = game.id;

    var similarGames = [];

    giantBomb.searchById(game.id, function(response) {
      var game = response.data;
      game.similar_games.forEach(function(game) {
        giantBomb.searchById(game.id, function(response) {
          var similarGame = response.data;
          game.image = similarGame.image.small_url;
          similarGames.push(game);
        });
      });
    });

    setTimeout(function() {
      $scope.similarGames = similarGames;
    }, 1000); // wait for similarGames to be populated so carousel has all things
    $scope.inCollection = false;
  });

  $rootScope.$on('gameChangeCollection', function(event, game) {
    $scope.data = game;
    $scope.similarGames = [];
    // Set up same format as giantbomb results...
    $scope.data.name = game.title;
    $scope.data.deck = game.summary;

    var similarGames = [];

    giantBomb.searchById(game.giantBombId, function(response) {
      var game = response.data;
      if (game.similar_games) {
        game.similar_games.forEach(function(game) {
          giantBomb.searchById(game.id, function(response) {
            var similarGame = response.data;
            if (similarGame.image) {
              game.image = similarGame.image.small_url;
            }
            similarGames.push(game);
          });
        });
        setTimeout(function() {
          $scope.similarGames = similarGames;
        }, 1000); // wait for similarGames to be populated so carousel has all things
      }
    });


    $scope.inCollection = true;
  });
}]);
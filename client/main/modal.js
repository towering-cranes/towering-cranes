// controller for modal
var app = angular.module('gameMon.modal', ['ui.materialize', 'gameMon.selectedGame', 'gameMon.search', 'gameMon.gameCollection']);

app.controller('ModalController', ['$scope', 'SelectedGame', '$rootScope', 'giantBomb', 'UserCollection', function($scope, SelectedGame, $rootScope, giantBomb, UserCollection) {
  $scope.data = {};
  $scope.similarGames = [];

  // true for add, false for remove
  $scope.inCollection;

  $scope.addGameToCollection = function(giantBombId) {
    UserCollection.addGameToCollection($rootScope.username, giantBombId, function(response) {
      $rootScope.$emit('collectionChange');
    });
    $scope.inCollection = true;
  };
  $scope.removeGameFromCollection = function(giantBombId) {
    UserCollection.removeGameFromCollection($rootScope.username, giantBombId, function(response) {
      $rootScope.$emit('collectionChange');
    });
    $scope.inCollection = false;
  };

  // Game from search is different than collection
  $rootScope.$on('gameChangeSearch', function(event, game) {
    $scope.data = game;
    $scope.similarGames = [];
    $scope.data.image = game.image ? game.image.small_url : null;
    $scope.data.giantBombId = game.id;

    giantBomb.searchById(game.id, function(response) {
      var game = response.data;
      $scope.data.releaseYear = game.original_release_date ? game.original_release_date.slice(0, 4) : null;
      $scope.data.videos = game.videos;
      $scope.data.genres = game.genres;
      $scope.data.franchises = game.franchises;
      $scope.similarGames = game.similar_games;
    });

    $scope.inCollection = false;
  });

  $rootScope.$on('gameChangeCollection', function(event, game) {
    $scope.data = game;
    $scope.similarGames = [];
    // Set up same format as giantbomb results...
    $scope.data.name = game.title;
    $scope.data.deck = game.summary;
    $scope.data.releaseYear = game.releaseDate ? game.releaseDate.slice(0, 4) : null;

    giantBomb.searchById(game.giantBombId, function(response) {
      var game = response.data;
      // $scope.data.videos = game.videos;
      $scope.similarGames = game.similar_games;
    });
    $scope.inCollection = true;
  });
}]);
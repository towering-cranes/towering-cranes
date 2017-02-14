// module with factory to pass game info
var app = angular.module('gameMon.selectedGame', ['gameMon.search', 'gameMon.modal']);

app.factory('SelectedGame', ['$http', 'giantBomb', '$rootScope', function($http, giantBomb, $rootScope) {
  var currentGame = {};
  var setCurrentGameFromCollection = function(game) {
    currentGame = game;
    $rootScope.$emit('gameChangeCollection', currentGame);
  };

  var setCurrentGameFromSearch = function(game) {
    currentGame = game;
    $rootScope.$emit('gameChangeSearch', currentGame);
  };

  var getCurrentGame = function() {
    return currentGame;
  };
  return {
    setCurrentGameFromCollection: setCurrentGameFromCollection,
    setCurrentGameFromSearch: setCurrentGameFromSearch,
    getCurrentGame: getCurrentGame,
  };
}]);
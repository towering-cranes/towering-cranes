var app = angular.module('gameMon.imGame', ['ui.materialize', 'gameMon.selectedGame']);

app.controller('ImGameController', function OtherCollectionController($scope, ForeignView, SelectedGame, $rootScope, $routeParams, $window, ImGameFactory) {
  $scope.data = {};
  $scope.username = localStorage.profile;
  $rootScope.username = localStorage.profile;
  $scope.gameTitle = $routeParams.gametitle;

  //get all users function
  var getUsers = function() {
    ImGameFactory.getGamers($scope.gameTitle, function(res) {
      $scope.data.users = res.data;
    });
  }

  //update i'm game status, calls get users on success
  var updateImGameStatus = function() {
    ImGameFactory.postImGame($scope.username, $scope.gameTitle, function(res) {
      getUsers();
    })
  }
  //call update, which will call getUsers
  updateImGameStatus();

  //Invoke getUsers to update social hub view to update users
  setInterval(function() {
    getUsers();
  }, 1000);

  var setStatusToNull = function() {
    ImGameFactory.postImGame($scope.username, null, function(res) {
      console.log('destroyed');
   })
  }

  $scope.$on('$destroy', setStatusToNull);

  $window.onbeforeunload = setStatusToNull;

});

app.factory('ImGameFactory', ['$http', function($http) {
  var output = {};

  output.postImGame = function(user, gametitle, callback) {
    $http({
      method: 'POST',
      url: '/api/users/' + user,
      data: JSON.stringify({gameTitle: gametitle})
    }).then(function(response){
      callback(response);
    }, failCallback);
  }

  output.getGamers = function(title, callback) {
    $http.get('api/users/' + title) //
      .then(function(response) {
        callback(response);
    }, failCallback);
  }


  var failCallback = function(response) {
    console.log('err: ', response);
  };

  return output;
}]);

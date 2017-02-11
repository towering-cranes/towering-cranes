var app = angular.module('gameMon.imGame', ['ui.materialize', 'gameMon.selectedGame']); //any other dependencies?
app.controller('ImGameController', function OtherCollectionController($scope, ForeignView, SelectedGame, $rootScope, $routeParams, ImGameFactory) {
  $scope.data = {}; //stores users
  $scope.username = localStorage.profile;
  $rootScope.username = localStorage.profile;
  //Store games in corresponding objects
  $scope.gameTitle = $routeParams.gametitle;

  //get all users function
  var getUsers = function() {
    ImGameFactory.getGamers($scope.gameTitle, function(res) {
      $scope.data.users = res.data;
    });
  }
  //update i'm game status, calls get users on success
  var updateImGameStatus = function() {
    ImGameFactory.postImGame($scope.username) {
      function(res) {
        console.log('user is game!')
        getUsers();
      }
    }
  }
  //call update, which will call getUsers
  updateImGameStatus();

  //post request for leaving room...


  // $rootScope.$on('collectionChange', function(event) {
  //   getCollection();
  // });

});

app.factory('ImGameFactory', ['$http', function($http) {
  var output = {};

  output.postImGame = function(user, gametitle, callback) {
    $http({
      method: 'GET', url: '/users/imgame/' + user,
      data: JSON.stringify({name: gametitle})
    }).then(function(response){
      callback(response);
    }, failCallback);
  };

  output.getGamers = function(title, callback) {
    $http.get('/users/imgame/' + title) //
      .then(function(response) {
        callback(response);
      }, failCallback);
    }
  };

  var failCallback = function(response) {
    console.log(response);
  };

  return db;
}]);

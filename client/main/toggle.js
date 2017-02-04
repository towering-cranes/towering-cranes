var app = angular.module('gameMon.toggle', ['auth0'])
  .config(function(authProvider){
    authProvider.init({
      domain: 'towering-cranes.auth0.com',
      clientID: 'QfGpmdzDtxUhduPejeKN8P1TadDU8OqG'
    });
  }).run(function(auth){
    auth.hookEvents();
  });

app.controller('LoginController', function(auth, $scope, $location, $http, $window){
  $scope.isLoggedIn = false;
  $scope.login = function(){
    auth.signin({}, function(profile, idToken, accessToken) {
      localStorage.setItem('profile', profile.user_id);
      localStorage.setItem('token', accessToken);
      $scope.isLoggedIn = true;
      $location.path('/gamemon');
    });
  }
  $scope.logout = function(){
    $scope.isLoggedIn = false;
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
  }
});
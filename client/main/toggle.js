var app = angular.module('gameMon.toggle', ['auth0'])
  .config(function(authProvider){
    authProvider.init({
      domain: 'modern-grasshoppers.auth0.com',
      clientID: 'bJt92FUnqvxDiGCEwjp107bav3XB4Ek6'
    });
  }).run(function(auth){
    auth.hookEvents();
  });

app.controller('LoginController', function(auth, $scope, $location, $http, $window, $rootScope, $route) {
  //it looks like auth0 gives you a key in localstorage
  $rootScope.isLoggedIn = localStorage.getItem('profile') ? true : false;
  $scope.login = function(){
    auth.signin({}, function(profile, idToken, accessToken) {
      console.log(profile);
      localStorage.setItem('name', profile.nickname);
      localStorage.setItem('email', profile.email);
      localStorage.setItem('profile', profile.user_id);
      localStorage.setItem('token', accessToken);
      $rootScope.isLoggedIn = true;
      if ($location.path() === '/gamemon') {
        $route.reload();
      } else {
        $location.path('/gamemon');
      }
    });
  }
  $scope.logout = function(){
    $rootScope.isLoggedIn = false;
    localStorage.removeItem('profile');
    localStorage.removeItem('token');
    $window.location.href = 'https://localhost:8080';
  }
});

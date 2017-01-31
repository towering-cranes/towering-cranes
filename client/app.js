angular.module('gamemon', [
  'gameMon.gameCollection',
  'gameMon.search',
  'gameMon.modal',
  'ngRoute'
  ])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'main/main.html'
  })
  .when('/signin', {
    templateUrl: 'user/signin.html'
  })
  .when('/signup', {
    templateUrl: 'user/signup.html'
  })
  .otherwise({redirectTo: '/'});
});
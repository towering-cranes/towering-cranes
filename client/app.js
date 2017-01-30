angular.module('gamemon', [
  'gameMon.gameCollection',
  'gameMon.search',
  'ngRoute'
  ])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'home.html'
  })
  .when('/signin', {
    templateUrl: 'signin.html'
  })
  .when('/signup', {
    templateUrl: 'signup.html'
  })
  .otherwise({redirectTo: '/'});
});
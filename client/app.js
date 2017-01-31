angular.module('gamemon', [
  'gameMon.gameCollection',
  'gameMon.search',
  'gameMon.modal',
  'ngRoute'
  ])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'home/home.html'
  })
  .when('/gamemon', {
    templateUrl: 'main/main.html'
  })
  .when('/signup', {
    templateUrl: 'user/signup.html'
  })
  .otherwise({redirectTo: '/'});
});
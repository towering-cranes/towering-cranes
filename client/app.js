angular.module('gamemon', [
  'gameMon.gameCollection',
  'gameMon.search',
  'gameMon.modal',
  'gameMon.toggle',
  'ngRoute'
  ])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'home/home.html'
  })
  .when('/gamemon', { //change this to myprofile?
    templateUrl: 'main/main.html',
    controller: 'LoginController'
  })
  //this is never used and the template doesn't exist
  // .when('/signup', {
  //   templateUrl: 'user/signup.html'
  // })
  .when('/profile/:username', {
    templateUrl: 'user/profileview',
    controller: 'ForeignViewController' // ??
  })
  .otherwise({redirectTo: '/gamemon'});
});
angular.module('gamemon', [
  'gameMon.gameCollection',
  'gameMon.search',
  'gameMon.modal',
  'gameMon.toggle',
  'gameMon.otherCollection',
  'gameMon.imGame',
  'ngRoute'
  ])
.config(function appJS($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'home/home.html'
  })
  .when('/gamemon', { //change this to myprofile instead of gamemon?
    templateUrl: 'main/main.html',
    controller: 'LoginController'
  })
  //this is never used and the template doesn't exist
  // .when('/signup', {
  //   templateUrl: 'user/signup.html'
  // })
  .when('/profiles/:username', {
    templateUrl: 'profile/profileview.html',
    controller: 'LoginController' // ??
  })
  .when('/imgame/:gametitle', {
    templateUrl: 'imgame/imgame.html',
    controller: 'ImGameController'
  })
  .otherwise({redirectTo: '/'}); //gamemon instead?
});
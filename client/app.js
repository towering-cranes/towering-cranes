angular.module('gamemon', ['ngRoute'])
.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'index.html'
  });
});
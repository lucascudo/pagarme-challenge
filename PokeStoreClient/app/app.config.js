'use strict';

angular.
  module('pokemoncatApp').
  config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/pokemons', {
          template: '<pokemon-list></pokemon-list>'
        }).
        otherwise('/pokemons');
    }
  ]).
  run(['$rootScope', function($rootScope) {
    $rootScope.ENV = {
        apiUrl: '//192.168.2.108:3000'
    };
  }]);

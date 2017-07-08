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
  ]);

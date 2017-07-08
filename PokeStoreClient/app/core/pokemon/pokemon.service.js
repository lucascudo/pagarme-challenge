'use strict';

angular.
  module('core.pokemon').
  factory('Pokemon', ['$resource',
    function($resource) {
      return $resource('http://192.168.2.107:3000/pokemon/:pokemonId', {}, {
        query: {
          method: 'GET',
          isArray: true
        }
      });
    }
  ]);

'use strict';

angular.
  module('core.pokemon').
  factory('Pokemon', ['$resource', '$rootScope',
    function($resource, $rootScope) {
      return $resource($rootScope.ENV.apiUrl + '/pokemon/:pokemonId', {}, {
        query: {
          method: 'GET',
          isArray: true
        },
        'save': {
          method: 'POST'
        },
      });
    }
  ]);

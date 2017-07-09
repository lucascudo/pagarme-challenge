'use strict';

angular.
  module('core.purchase').
  factory('Purchase', ['$resource', '$rootScope',
    function($resource, $rootScope) {
      return $resource($rootScope.ENV.apiUrl + '/purchase/', {}, {
        'save': {
          method: 'POST'
        },
      });
    }
  ]);

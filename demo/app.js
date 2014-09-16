(function (angular) {
  'use strict';

  function NavigationCtrl($location) {
    this.isActive = function (route) {
      return route === $location.path();
    };
  }

  function Config($routeProvider) {
    $routeProvider
      .when('/demo', {
        templateUrl: 'demo/simple.view.html',
        controller: 'SimpleCtrl'
      })
      .when('/about', {
        templateUrl: 'demo/about.view.html'
      })
      .otherwise({
        redirectTo: '/demo'
      });
  }

  function IntegerDirective() {
    return {
      require: 'ngModel',
      link: function (scope, ele, attr, ctrl) {
        ctrl.$parsers.unshift(function (viewValue) {
          if (viewValue === '' || viewValue === null || typeof viewValue === 'undefined') {
            return null;
          }
          return parseInt(viewValue, 10);
        });
      }
    };
  }

  angular.module('app', ['fluidGrid', 'ngRoute'])
    .config(['$routeProvider', Config])
    .directive('integer', IntegerDirective)
    .controller('NavigationCtrl', ['$location', NavigationCtrl]);

})(angular);

(function (angular) {


  angular.module('app')

    .directive('custom', function () {
      return {
        restrict: 'A',
        templateUrl: 'demo/custom.html',
        scope: {
          item: '='
        }
      };
    });

})(angular);

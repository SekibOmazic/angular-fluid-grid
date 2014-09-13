(function(angular) {

	angular.module('app', ['fluidGrid', 'ngRoute'])
		.config(['$routeProvider',
			function($routeProvider) {
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
		])

	.directive('integer', function() {
		return {
			require: 'ngModel',
			link: function(scope, ele, attr, ctrl) {
				ctrl.$parsers.unshift(function(viewValue) {
					if (viewValue === '' || viewValue === null || typeof viewValue === 'undefined') {
						return null;
					}
					return parseInt(viewValue, 10);
				});
			}
		};
	})

	.controller('NavigationCtrl', function($scope, $location) {
		this.isActive = function(route) {
			return route === $location.path();
		};
	});

})(angular);

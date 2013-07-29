angular.module('omahaproxyApp', ['omahaproxyApp.controllers', 'omahaproxyApp.directives', 'omahaproxyApp.filters'])
	.config(function ($routeProvider) {

		$routeProvider
			.when('/presenatie', {
				templateUrl: '/views/presentatie.html',
				controller: 'PresentatieCtrl'
			})
			.when('/omahaproxy', {
				templateUrl: 'views/omahaproxy.html',
				controller: 'OmahaproxyCtrl'
			})


			.otherwise({ redirectTo: '/presenatie' });

	});


angular.module('omahaproxyApp.controllers', ['omahaproxyApp.services']);
angular.module('omahaproxyApp.services', []);
angular.module('omahaproxyApp.directives', []);
angular.module('omahaproxyApp.filters', []);

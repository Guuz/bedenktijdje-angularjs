angular.module('omahaproxyApp', ['ngRoute', 'omahaproxyApp.controllers', 'omahaproxyApp.directives', 'omahaproxyApp.filters'])
	.config(function ($routeProvider) {

		$routeProvider
			.when('/presentatie', {
				templateUrl: '/views/presentatie.html',
				controller: 'PresentatieCtrl'
			})
			.when('/omahaproxy', {
				templateUrl: 'views/omahaproxy.html',
				controller: 'OmahaproxyCtrl'
			})


			.otherwise({ redirectTo: '/presentatie' });

	});


angular.module('omahaproxyApp.controllers', ['omahaproxyApp.services']);
angular.module('omahaproxyApp.services', []);
angular.module('omahaproxyApp.directives', []);
angular.module('omahaproxyApp.filters', []);

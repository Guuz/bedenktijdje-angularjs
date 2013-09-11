describe('When Active Directive', function(){
	var $location
	  , $rootScope



	beforeEach(module('omahaproxyApp.directives'));

	beforeEach(inject(function($injector, $compile) {
		$location = $injector.get('$location');
		$rootScope = $injector.get('$rootScope');

		element = angular.element('<li when-active><a href="#/matching-url">Presentatie</a></li>');
		element = $compile(element)($rootScope);
	}));



	it('should mark the active element', function() {
		$location.path('/some-url');
		$rootScope.$broadcast('$routeChangeSuccess');
		expect( element.attr('class') ).not.toContain('active');

		$location.path('/matching-url');
		$rootScope.$broadcast('$routeChangeSuccess');
		expect( element.attr('class') ).toContain('active');
	});

});

describe('Google Images Service', function(){
	var $httpBackend
	  , GoogleImagesService
	  , $rootScope
	  , param = 'angularjs'



	// Define the module where the component we are going to test is declared.
	beforeEach(module('omahaproxyApp.services'));

	beforeEach(inject(function($injector) {
		// Get instances from the injector.
		$httpBackend = $injector.get('$httpBackend');
		GoogleImagesService = $injector.get('GoogleImagesService');
		$rootScope = $injector.get('$rootScope');

		// We expect a JSONP call to the API and we define the response.
		$httpBackend
			.expectJSONP(/ajax.googleapis.com/)
			.respond( [{name: 'image1'}, {name: 'image2'}] )
	}));

	// Check that we have no open expectations or requests.
	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});



	it('should fetch images from the Google API only once', function() {
		var result1
		  , result2

		// First request.
		GoogleImagesService.search( param ).then( function( searchResult ) {
			result1 = searchResult.data;
		});
		$httpBackend.flush();
		expect( result1.length ).toBe( 2 );

		// Second request.
		GoogleImagesService.search( param ).then( function( searchResult ) {
			result2 = searchResult.data;
		});
		// This time there is no HTTP request to flush. We need to run an AngularJS digest loop to resolve the promise.
		$rootScope.$apply();
		expect( result1 ).toEqual( result2 );
	});

});

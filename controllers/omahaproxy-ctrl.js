angular.module('omahaproxyApp.controllers')
	.controller('OmahaproxyCtrl', function( $scope, resolvedChromebooks, GoogleImagesService, $q, $timeout ) {

		// Get a resolved list of chromebooks from the router and add an image for every device.
		$scope.chromebooks = addImagePromiseToChromebooks( resolvedChromebooks );



		// Add thumbnail images data to the chromebook data.
		function addImagePromiseToChromebooks( chromebooks ) {
			return chromebooks.map( addImagePromise );
		}



		// Helper function to make the .map() more readable.
		function addImagePromise( chromebook ) {
			// Add a image promise to the chromebook object. Angular will handle this in the view and show the results there.
			chromebook.image = GoogleImagesService.search( chromebook.name ).then(function( searchRes ) {
				// Just take a random image and return the relevant data.
				var result = searchRes.data.responseData.results
				  , random = Math.floor( Math.random() * result.length )
				  , image = result[ random ]

				return {
					src: image.tbUrl,
					width: image.tbWidth,
					height: image.tbHeight
				}
			}).then( debugDelay );

			return chromebook;
		}



		// Make the effect more visible by random delaying the promise.
		function debugDelay( res ) {
			var dfd = $q.defer();

			$timeout(function() {
				dfd.resolve(res);
			}, Math.random() * 1000 + 500)

			return dfd.promise;
		}

	});

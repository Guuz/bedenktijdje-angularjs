angular.module('omahaproxyApp.controllers')
	.controller('OmahaproxyCtrl', function( $scope, $q, OmahaproxyService, GoogleImagesService ) {

		// Get a list of chromebooks from the OmahaProxy and add an image from every device.
		$scope.chromebooks = OmahaproxyService.get().then( addImagesToChromebooks );



		// Add thumbnail images data to the chromebook data.
		function addImagesToChromebooks( chromebooks ) {
			return $q.all( chromebooks.map( addImage ) );
		}



		// Helper function to make the .map() more readable.
		function addImage( chromebook ) {
			// Fire of a search request and handle the returning data.
			return GoogleImagesService.search( chromebook.name ).then(function( searchRes ) {
				// Just take a random image, make a clone, modify it and return the new enriched chromebook object.
				var result = searchRes.data.responseData.results
				  , random = Math.floor( Math.random() * result.length )
				  , image = result[ random ]
				  , chromebookClone = angular.copy( chromebook )

				chromebookClone.image = {
					src: image.tbUrl,
					width: image.tbWidth,
					height: image.tbHeight
				}

				return chromebookClone;
			});
		}

	});

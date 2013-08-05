angular.module('omahaproxyApp.controllers')
	.controller('OmahaproxyCtrl', function( $scope, $q, OmahaproxyService, GoogleImagesService ) {

		$scope.chromebooks = OmahaproxyService.get().then( addImagesToChromebooks );



		// Add thumbnail images data to the chromebook data.
		function addImagesToChromebooks( chromebooks ) {
			return $q.all( chromebooks.map( addImage ) );
		}



		// Helper function to make the .map() more readable.
		function addImage( chromebook ) {
			return GoogleImagesService.search( chromebook.name ).then(function( searchRes ) {
				var imageRes = searchRes.data.responseData.results[0]
				  , chromebookClone = angular.copy( chromebook )

				chromebookClone.image = {
					src: imageRes.tbUrl,
					width: imageRes.tbWidth,
					height: imageRes.tbHeight
				}

				return chromebookClone;
			});
		}

	});

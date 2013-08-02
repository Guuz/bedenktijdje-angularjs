angular.module('omahaproxyApp.controllers')
	.controller('OmahaproxyCtrl', function( $scope, $q, OmahaproxyService, GoogleImagesService ) {

		$scope.chromebooks = OmahaproxyService.get().then( addImagesToChromebooks );


		// Add thumbnail images data to the chromebook data.
		function addImagesToChromebooks( chromebooks ) {
			var promises = Object.keys( chromebooks ).map( mapChromebookImages );

			return $q.all(promises);

			// Helper function to make the .map() more readable.
			function mapChromebookImages( key ) {
				return GoogleImagesService.search( key ).then(function( searchRes ) {
					var imageRes = searchRes.data.responseData.results[0];

					chromebooks[ key ].image = {
						src: imageRes.tbUrl,
						width: imageRes.tbWidth,
						height: imageRes.tbHeight
					}

					return chromebooks;
				});
			}
		}



		//$scope.chromebookImg = GoogleImagesService.search('chromebook');

	});

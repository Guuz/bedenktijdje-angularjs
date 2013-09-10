angular.module('omahaproxyApp.controllers')
	.controller('PresentatieCtrl', function( $scope ) {

		$scope.setRandom = function() {
			$scope.exampleString = Math.random();
		}

	});

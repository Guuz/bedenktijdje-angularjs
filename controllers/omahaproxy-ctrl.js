angular.module('omahaproxyApp.controllers')
	.controller('OmahaproxyCtrl', function( $scope, OmahaproxyService ) {

		$scope.chromebooks = OmahaproxyService.get();

	});

angular.module('omahaproxyApp.services')
	.factory('GoogleImagesService', function( $http ) {

		return {
			search: function( param ) {
				param = encodeURIComponent( param );
				return $http.jsonp('https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q='+ param +'&callback=JSON_CALLBACK');
			}
		};
	});

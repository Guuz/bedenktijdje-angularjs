angular.module('omahaproxyApp.services')
	.factory('GoogleImagesService', function( $http, $cacheFactory ) {
		var cache = $cacheFactory('chromebookImages');

		return {
			search: function( param ) {
				param = encodeURIComponent( param );

				// First check if we got a cached version of this promise.
				var cachedPromise = cache.get( param );
				if( cachedPromise ) {
					return cachedPromise;
				} else {
					// No cached version. Make a request, cache that and return the promise.
					var promise = $http.jsonp('https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q='+ param +'&callback=JSON_CALLBACK');
					cache.put( param, promise );
					return promise;
				}
			}
		};
	});

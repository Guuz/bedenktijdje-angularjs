angular.module('omahaproxyApp.services')
	.factory('OmahaproxyService', function( $http, $q ) {
		var deferred = $q.defer();



		const TIMESTAMP_INDEX        = 0; // unused
		const CHROMEOS_VERSION_INDEX = 1; // unused
		const CHROME_VERSION_INDEX   = 2;
		const APPID_INDEX            = 3; // unused
		const TRACK_INDEX            = 4;
		const HARDWARE_INDEX         = 5;

		// Convert the raw CSV data to a usable object.
		function rawDataToObject( rawData ) {
			var lines = rawData.split('\n')
			  , data = {}

			// Scrap first and last lines
			lines = lines.splice(1, lines.length-2)

			lines.forEach(function( rawLine ) {
				var line = rawLine.split(',');

				var hardware = line[HARDWARE_INDEX];
				// Ignore "He" hardware since they are the same
				if (hardware.indexOf(' - He') !== -1) {
					hardware = hardware.substr(0, hardware.indexOf(' - He'));
				}
				data[hardware] = data[hardware] || {};

				var channel = line[TRACK_INDEX];
				channel = channel.substr(0, channel.indexOf('-channel'));

				var chromeVersion = line[CHROME_VERSION_INDEX];
				data[hardware][channel] = chromeVersion;
			});

			return data;
		}



		return {
			get: function() {
				$http.get('https://cros-omahaproxy.appspot.com/all').then(function( res ) {
					var ret = rawDataToObject( res.data );
					deferred.resolve( ret );
				}, function( error ) {
					deferred.reject( error );
				});

				return deferred.promise;
			}
		};
	});

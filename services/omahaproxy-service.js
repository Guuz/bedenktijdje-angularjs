angular.module('omahaproxyApp.services')
	.factory('OmahaproxyService', function( $http ) {

		var TIMESTAMP_INDEX        = 0; // unused
		var CHROMEOS_VERSION_INDEX = 1; // unused
		var CHROME_VERSION_INDEX   = 2;
		var APPID_INDEX            = 3; // unused
		var TRACK_INDEX            = 4;
		var HARDWARE_INDEX         = 5;

		// Convert the raw CSV data to a usable object.
		function responseToObject( response ) {
			var lines = response.data.split('\n')
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



		function objToArray( keyedObject ) {
			return Object.keys( keyedObject ).map( function(key) {
				var obj = keyedObject[key];
				obj.name = key;
				return obj;
			});
		}



		return {
			get: function() {
				return $http.get('https://cros-omahaproxy.appspot.com/all', { cache: true }).then( responseToObject ).then( objToArray );
			}
		};
	});

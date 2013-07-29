angular.module('omahaproxyApp.controllers')
	.directive('whenActive', function ( $location ) {
		return {
			scope: true,

			link: function ( scope, element, attrs ) {
				// Cache the link element.
				var link = element.find('a');

				scope.$on('$routeChangeSuccess', function() {
					var ownHref = link.attr('href').replace(/^#/, '') // Remove the # from the href.
					  , isActive = $location.path() == ownHref

					// Set the class when active.
					element.toggleClass('active', isActive);
				});
			}
		};
	});

angular.module('omahaproxyApp.directives')
	.directive('fadeImage', function () {
		// Add a class on image load.
		return {
			link: function(scope, element, attrs) {
				// 'element' is a jqLite element so we can use jQuery's 'on()'.
				element.on('load' , function(e){
					element.addClass("show");
					element.off('load');
				});
			}
		}
});

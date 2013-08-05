angular.module('omahaproxyApp.directives')
	.directive('fadeImage', function () {
		// Add a class on image load.
		return {
			link: function(scope, element, attrs) {
				element.bind("load" , function(e){
					element.addClass("show");
				});
			}
		}
});

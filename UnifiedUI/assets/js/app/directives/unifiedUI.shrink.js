bliss.directive("shrink", [function() {
		
	var shrink = function($element, to) {
		$element.css({
			transform: "scaleY(0)",
			overflow: "hidden",
			opacity: 0,
			margin: 0,
			height: to.y +"px"
		});
	};
	
	var grow = function($element, to) {
		$element.css({
			transform: "scaleY(1)",
			overflow: "visible",
			opacity: 1,
			margin: null,
			height: to.y +"px"
		});
	};
	
	return {
		restrict: "A",
		scope: {
			shrink: "="
		},
		controller: ["$scope", "$element", function($scope, $element) {
			var el = $element[0];
			var open = {x:el.clientWidth, y:el.clientHeight};
			var close = {x:0, y:0};
			
			$element.css({
				height: open.y
			});
			$scope.$watch("shrink", function(flag) {
				if (flag) {
					shrink($element, close);
				} else {
					grow($element, open);
				}
			});
		}]
	};
}]);
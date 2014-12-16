bliss.controller("unifiedUI.LayoutCtrl", ["$scope", function($scope) {
	$scope.toggleMenu = function() {
		$scope.menuOpen = !$scope.menuOpen;
	};
	
	$scope.$on("$locationChangeStart", function() {
		$scope.menuOpen = false;
	});
}]);
bliss.controller("unifiedUI.LayoutCtrl", ["$rootScope", "pages.Page", function($scope, Page) {
	var preventMenuClose = false;
	
	$scope.menuOpen = false;
	$scope.page = null;
	
	$scope.pageTitle = function() {
		if ($scope.page) {
			return $scope.page.title +" - "+ $scope.app.name;
		} else {
			return $scope.app.name;
		}
	};
	
	$scope.toggleMenu = function() {
		$scope.menuOpen = !$scope.menuOpen;
	};
	
	$scope.preventMenuClose = function() {
		preventMenuClose = true;
	};
	
	$scope.$on("$locationChangeStart", function() {
		$scope.page = null;
	});
	$scope.$on("$routeChangeSuccess", function() {
		$scope.menuOpen = preventMenuClose ? $scope.menuOpen : false;
		
		preventMenuClose = false;
	});
	$scope.$on(Page.EVENT_ACTIVATED, function(e, page) {
		$scope.page = page;
		$scope.app.title = page.title +" - "+ $scope.app.name;
	});
}]);
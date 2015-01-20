bliss.controller("unifiedUI.LayoutCtrl", ["$rootScope", "bliss.App", "pages.Page", "unifiedUI.Layout", function($scope, App, Page, Layout) {
	var preventMenuClose = false;
	
	$scope.menuOpen = false;
	$scope.page = null;
	$scope.layout = Layout;
	
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
	
	$scope.$watch(function() { return App.config().unifiedui; }, function(config) {
		$scope.layout.setConfig(config);
	});
	$scope.$on("$locationChangeStart", function() {
		$scope.page = null;
	});
	$scope.$on("$routeChangeSuccess", function() {
		$scope.menuOpen = preventMenuClose === true ? $scope.menuOpen : false;
		$scope.layout.reset();
		
		preventMenuClose = false;
	});
	$scope.$on(Page.EVENT_ACTIVATED, function(e, page) {
		$scope.page = page;
		$scope.app.title = page.title +" - "+ $scope.app.name;
	});
}]);
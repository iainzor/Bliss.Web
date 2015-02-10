bliss.controller("unifiedUI.NavigationCtrl", ["$scope", "$location", "bliss.App", "pages.Page", "unifiedUI.Navigation", function($scope, $location, App, Page, Nav) {
	var activate = function(path) {
		Nav.reset();
		
		var found = Nav.find(path);
		if (found) {
			Nav.page(found);
		}
	};
		
	$scope.intercepted = false;
	$scope.intercept = function($event, page) {
		if (page.pages && page.pages.length > 0 && !page.active) {
			Page.reset($scope.pages);
			page.active = true;
			$scope.intercepted = true;
			$scope.preventMenuClose();
		}
	};
	
	$scope.pages = [];
	$scope.$watch(function() { return App.config(); }, function(app) {
		if (!app || !app.ready) { return; }
		
		if ($scope.intercepted) {
			$scope.intercepted = false;
		} else {
			$scope.pages = app.pages;
			
			Nav.pages(app.pages);
		}
	}, true);
	
	$scope.$on("$locationChangeStart", function() {
		activate($location.path());
	});
	$scope.$on("$routeChangeSuccess", function(e) {
		if ($scope.intercepted) {
			e.stopPropagation();
		}
	});
}]);
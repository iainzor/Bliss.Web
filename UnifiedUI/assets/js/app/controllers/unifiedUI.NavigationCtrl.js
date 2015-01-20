bliss.controller("unifiedUI.NavigationCtrl", ["$rootScope", "$scope", "$location", "pages.Page", function($root, $scope, $location, Page) {
	var activate = function(pages, path) {
		var found = Page.activate(pages, path);
		
		if (found) {
			$scope.$emit(Page.EVENT_ACTIVATED, found);
		}
	};
		
	$scope.intercepted = false;
	$scope.intercept = function($event, page) {
		if (page.pages.length > 0 && !page.active) {
			//$event.preventDefault();
			
			Page.reset($scope.pages);
			page.active = true;
			$scope.intercepted = true;
			$scope.preventMenuClose();
		}
	};
	
	$scope.pages = $root.app ? $root.app.pages : [];
	$root.$watch("app", function(app) {
		if (!app || !app.ready) { return; }
		
		if ($scope.intercepted) {
			$scope.intercepted = false;
		} else {
			$scope.pages = app.pages;
			activate(app.pages, $location.path());
		}
	}, true);
	
	$scope.$on("$locationChangeStart", function() {
		activate($scope.pages, $location.path());
	});
	$scope.$on("$routeChangeSuccess", function(e) {
		if ($scope.intercepted) {
			e.stopPropagation();
		}
	});
}]);
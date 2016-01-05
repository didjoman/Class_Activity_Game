"use strict";
angular.module('Pager', [])
.directive('pagerbuttons', function() {
  return {
    restrict: 'E',
    scope: {
            pages: "=pages",
            pageContent: "=pageContent"
    },
    controller: 'PagerButtonsCtrl',
    templateUrl: 'scripts/pager/pager.html'
  };
})
.controller('PagerButtonsCtrl', function($scope, $log, $attrs, $sce, QuestionsService) {
	$scope.currentPage = 1;

	$scope.returnPage = function(){
		return $scope.currentPage;
	}
	$scope.nextPage = function(event){
		$scope.setPage($scope.currentPage + 1, event);
	};
	$scope.lastPage = function(event){
		$scope.setPage($scope.currentPage - 1, event);
	};

	$scope.setPage = function(i, event){
		if(i >= 1 && i <= $scope.pages.length){
			console.log("setpage");
			$scope.currentPage = i;
			$scope.pageContent = $sce.trustAsHtml($scope.pages[$scope.currentPage - 1]);
		}
		if(event){
			event.stopPropagation();
      		event.preventDefault();
		}
	};

	$scope.showPager = function(){
		return $scope.pages && 
				$scope.pages.constructor === Array && 
				$scope.pages.length > 1;
	};
	
	$scope.showPagerLeftArrow = function(){
		return $scope.showPager && $scope.currentPage > 1;
	};
	
	$scope.showPagerRightArrow = function(){
		return $scope.showPager && $scope.currentPage < $scope.pages.length;
	};
});
angular.module('Scores', ['Player'])
.controller('ScoresCtrl', function($scope, PlayersService) {
	$scope.data = PlayersService.data;
	$scope.getCurrentPlayer = PlayersService.getCurrentPlayer;
});

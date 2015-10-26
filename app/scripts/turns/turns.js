angular.module('Turns', ['Player', 'Questions'])
.service('TurnsService', function($log, $timeout, QuestionsService, PlayersService, _) {
		
	var service = this;
	var playerId = 0;
	var nbPlayers = 0;
	var nbTurns = 0;
	this.turns = [];

	this.init = function(){
		var questions = QuestionsService.getQuestions();
		var players = PlayersService.getPlayers();

		nbPlayers = PlayersService.getPlayers().length;
		nbTurns = Math.min(nbPlayers, questions.length);

		for (var i = 0; i < nbTurns; ++i) {
			if(questions[i].type === 'multi'){
				service.turns.push(PlayersService.getPlayerAll());
			} else {
				console.log(playerId+' '+players[playerId]+' '+PlayersService.getPlayer(0));
				service.turns.push(players[playerId++]);
			}
		};
	};

	this.newTurn = function(){
		service.turns.shift();
		var idNextQuestion = QuestionsService.getCurrentQuestionId() + (nbTurns - 1);
		var isMulti = QuestionsService.isQuestionMultiPlayer(idNextQuestion);

		if(isMulti === true){
			service.turns.push(PlayersService.getPlayerAll());
		} else if(isMulti === false){
			console.log(playerId);
			service.turns.push(PlayersService.getPlayers()[(playerId % nbPlayers)]);
			playerId++;
		}	
	};

	this.getCurrentTurn = function(){
		return (service.turns.length > 0) ? service.turns[0] : undefined;
	};

})
.controller('TurnsCtrl', function($scope, PlayersService, TurnsService) {
	$scope.data = PlayersService.data;
	$scope.getCurrentPlayer = PlayersService.getCurrentPlayer;
	$scope.turns = TurnsService.turns;
	$scope.getCurrentTurn = TurnsService.getCurrentTurn;
})
.directive('turns', function() {
  return {
    restrict: 'A',
    controller: 'TurnsCtrl',
    templateUrl: 'scripts/turns/turns.html'
  };
});
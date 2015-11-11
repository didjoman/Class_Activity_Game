"use strict";
angular.module('Turns', ['Player', 'Questions'])
.service('TurnsService', function($log, $timeout, QuestionsService, PlayersService) {
		
	var service = this;
	var playerId = 0;
	var nbPlayers = 0;
	var nbTurns = 0;
	this.data = {};
	this.data.turns = [];

	this.init = function(){
		var questions = QuestionsService.getQuestions();
		var players = PlayersService.getPlayers();

		nbPlayers = PlayersService.getPlayers().length;
		nbTurns = Math.min(nbPlayers, questions.length);

		for (var i = 0; i < nbTurns; ++i) {
			if(questions[i].type === 'multi'){
				service.data.turns.push(PlayersService.getPlayerAll());
			} else {
				service.data.turns.push(players[playerId++]);
			}
		}
	};

	this.reinit = function(){
		playerId = 0;
		service.data.turns = [];
		service.init();
	}

	this.newTurn = function(){
		service.data.turns.shift();
		var idNextQuestion = QuestionsService.getCurrentQuestionId() + (nbTurns - 1);
		var isMulti = QuestionsService.isQuestionMultiPlayer(idNextQuestion);

		if(isMulti === true){
			service.data.turns.push(PlayersService.getPlayerAll());
		} else if(isMulti === false){
			service.data.turns.push(PlayersService.getPlayers()[(playerId % nbPlayers)]);
			playerId++;
		}	
	};

	this.getCurrentTurn = function(){
		return (service.data.turns.length > 0) ? service.data.turns[0] : undefined;
	};

})
.controller('TurnsCtrl', function($scope, PlayersService, TurnsService) {
	$scope.getCurrentPlayer = PlayersService.getCurrentPlayer;
	$scope.data = TurnsService.data;
	$scope.getCurrentTurn = TurnsService.getCurrentTurn;
})
.directive('turns', function() {
  return {
    restrict: 'A',
    controller: 'TurnsCtrl',
    templateUrl: 'scripts/turns/turns.html'
  };
});
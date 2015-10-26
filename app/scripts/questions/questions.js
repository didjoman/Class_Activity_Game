"use strict";
angular.module('Questions', ['Player', 'Grid', 'Turns'])
.service('QuestionsService', function($uibModal, $log, $timeout, PlayersService, _) {
	var service = this;

	this.data = {};
  	this.data.roundWon = false;
  	this.data.roundWinner = undefined;

  	this.animationsEnabled = true;
  	this.questions = [];
  	this.currentQuestionId = 0;

	this.init = function(questions){
	  	service.questions = questions;
	  	//PlayersService.changePlayer(service.isCurrentQuestionMultiPlayer());
	};

	this.getCurrentQuestionId = function(){
		return service.currentQuestionId;
	};

	this.increaseQuestionId = function(){
		++(service.currentQuestionId);
	};

	this.getRemainingQuestions = function(){
		return _.slice(service.questions, 0, service.questions.length);
	};

	this.getNbRemainingQuestions = function(){
		return service.questions.length - (service.currentQuestionId + 1);
	};

	this.getCurrentQuestion = function(){
		return service.getQuestion(service.currentQuestionId);
	};

	this.getQuestion = function(id){
		return (id>=0 && id < service.questions.length) ?
			service.questions[id] :
			undefined;
	};

	this.getQuestions = function(){
		return service.questions;
	};

	this.isCurrentQuestionMultiPlayer = function(){
		return service.isQuestionMultiPlayer(service.getCurrentQuestionId());
	};

	this.isQuestionMultiPlayer = function(id){
		var q = service.getQuestion(id);
		if(q === undefined){
			return undefined;
		}

		return q.type === 'multi';
	};

	this.winRound = function(playerId){
		service.data.roundWinner = PlayersService.getPlayer(playerId);
		service.data.roundWon = true;
		$timeout(function() {
			service.data.roundWon = false;
			$timeout(function() {
				service.data.roundWinner = undefined;
			}, 500); // time the picture would disappear, must be the same as in css
	   	}, 1500);
	};

	this.containsMultiPlayerQuestions = function(){
		return _.find(service.questions, function(q) {
  				return q.type === 'multi';
				}) !== -1;
	};

  	this.open = function (size, cb) {
    	var modalInstance = $uibModal.open({
      		animation: service.animationsEnabled,
      		templateUrl: 'scripts/questions/question.html',
      		controller: 'QuestionCtrl',
      		size: size,
      		resolve: {
        		question: function () {
          			return service.questions[service.currentQuestionId];
        		},
        		cb : function() { return cb;}
        	}	
    	});

    	modalInstance.result.then(function (selectedItem) {
    		this.selected = selectedItem;
    	}, function () {
      		//$log.info('Modal dismissed at: ' + new Date());
    	});
  	};

  	this.toggleAnimation = function () {
    	this.animationsEnabled = !this.animationsEnabled;
  	};
})
.controller('QuestionsCtrl', function($scope, $uibModal, $log, QuestionsService) {
	$scope.open = function(size) {
		QuestionsService.open(size, angular.noop);
	};
})
.controller('QuestionCtrl', 
	function($scope, $modalInstance, question, cb, QuestionsService, PlayersService, GridService, TurnsService) {
	
	$scope.question = question;
	$scope.players = PlayersService.getPlayers();
	$scope.turn = TurnsService.getCurrentTurn;

	$scope.skip = function(){
		QuestionsService.increaseQuestionId();
		$modalInstance.dismiss('cancel');
	};

	$scope.addPointToPlayerByName = function(playerName, nbPoints){
		$scope.addPointToPlayerById(PlayersService.getPlayerId(playerName), nbPoints);
	};

	$scope.addPointToPlayerById = function(playerId, nbPoints){
		PlayersService.addPointToPlayer(playerId, nbPoints);
		if(nbPoints > 0){
			QuestionsService.winRound(playerId);
		}
		GridService.updatePlayerPos(playerId);
		QuestionsService.increaseQuestionId();
		// Call the callback : (most of time : Turns.endTurn() )
		cb();
		$modalInstance.dismiss('cancel');
	};

	$scope.cancel = function () {
		console.log('cancel');
	  	$modalInstance.dismiss('cancel');
	};
})
.filter('questionPlayers', function(PlayersService, TurnsService) {
  	return function(input, isMultiplayer) {
	    input = input || {};
	    isMultiplayer = isMultiplayer || 'single';
	    if(isMultiplayer === 'multi'){
	    	return input;
	    }

	   	var out= [];
	   	for (var i = input.length - 1; i >= 0; i--) {
	   		if(input[i] && input[i].name === TurnsService.getCurrentTurn().name){
	   			out.push(input[i]);
	   		}
	   	}
	    return out;
 	};
});
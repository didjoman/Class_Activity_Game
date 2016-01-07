"use strict";
angular.module('Questions', ['Player', 'Grid', 'Turns', 'Pager'])
.factory('QuestionModel', function($sce) {
	var Question = function(title, question, answer, type, points) {
	   	this.title = title || '';
	  	this.question = $sce.trustAsHtml(""+question) || '<br />';
	  	this.answer = answer || '<br />';
	   	this.type = type || 'single';
	   	this.points = points || [1];
	   	if (this.points.constructor !== Array){
	   		this.points = [points];
	   	}
	};

  	return Question;
})
.service('QuestionsService', function($uibModal, $log, $timeout, PlayersService, QuestionModel, _) {
	var service = this;

	this.data = {};
  	this.data.roundWon = false;
  	this.data.roundWinner = undefined;

  	this.animationsEnabled = true;
  	this.questions = [];
  	this.currentQuestionId = 0;

	this.init = function(questions){
	  	service.questions = [];
	  	for(var i = 0; i < questions.length; ++i){
	  		service.questions.push(
	  			new QuestionModel(questions[i].title, 
	  					questions[i].question, 
	  					questions[i].answer, 
	  					questions[i].type, 
	  					questions[i].points)
	  		);
	  	}
	  	//PlayersService.changePlayer(service.isCurrentQuestionMultiPlayer());
	};

	this.reinit = function(){
		service.currentQuestionId = 0;
		service.data.roundWon = false;
  		service.data.roundWinner = undefined;
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

  	this.openModal = function (size, cb) {
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
	$scope.openModal = function(size) {
		QuestionsService.openModal(size, angular.noop);
	};
})
.controller('QuestionCtrl', 
	function($scope, $sce, $modalInstance, $timeout, question, cb, QuestionsService, PlayersService, GridService, TurnsService) {
	
	$scope.question = question;
	$scope.players = PlayersService.getPlayers();
	$scope.turn = TurnsService.getCurrentTurn;

	$scope.answerBtn = "Answer";
	$scope.cardContent = question.question;
	$scope.cardTitle = "Question";


	$scope.turnQuestionCard = function(){
		if($scope.answerBtn == "Question"){
			$scope.answerBtn = "Answer";
			$scope.cardContent = $sce.trustAsHtml(""+question.question);
			$scope.cardTitle = "Question";
		} else {
			$scope.answerBtn = "Question";
			if(question.answer.constructor === Array){
				$scope.currentPage = 1;
				$scope.cardContent = $sce.trustAsHtml(question.answer[0]);
			} else {
				$scope.cardContent = $sce.trustAsHtml(question.answer);
			}
			$scope.cardTitle = "Answer";
		}
	};

	$scope.skip = function(){
		QuestionsService.increaseQuestionId();
		cb(); // Call the callback : (most of time : Turns.endTurn() )
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

	$scope.cancelModal = function () {
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
	   		if(input[i] && TurnsService.getCurrentTurn() && 
	   			input[i].name === TurnsService.getCurrentTurn().name){
	   			out.push(input[i]);
	   		}
	   	}
	    return out;
 	};
})
.directive('playbtn', function() {
  return {
    restrict: 'E',
    controller: 'PlayBtnCtrl',
    templateUrl: 'scripts/questions/play_btn.html'
  };
})
.controller('PlayBtnCtrl', function($scope, $uibModal, $log, $attrs, QuestionsService) {
	$scope.deactivated = function() {
		return QuestionsService.getCurrentQuestion() === undefined;
	}
	$scope.content = $attrs.content;
});
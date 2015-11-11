"use strict";
angular.module('Game', ['Grid', 'Player', 'Questions', 'Turns'])
.service('GameManager', function($q, $timeout, GridService, PlayersService, QuestionsService, TurnsService) {
  var service = this;

  this.grid = GridService.grid;
  this.players = PlayersService.players;
  this.currentPlayer = PlayersService.currentPlayer;
  this.gameSize = GridService.getSize();
  this.scoreMax = 0;

  this.questionsServ = QuestionsService.data;
  this.roundWon = QuestionsService.data.roundWon;
  this.roundWinner = QuestionsService.data.roundWinner;

  this.play = function(){
  	QuestionsService.open('lg', TurnsService.newTurn);
	//service.currentPlayer = PlayersService.getCurrentPlayer();
  };

    // Create a new game
  this.newGame = function(players, size, questions) {
    service.scoreMax = size - 1;
    GridService.initGrid(size, players);
    QuestionsService.init(questions);
    TurnsService.init();
  };

  // Reset game state
  this.reinit = function() {
    GridService.reinit();
    QuestionsService.reinit();
    TurnsService.reinit();
  };

  this.isFinished = function(){
    return PlayersService.getBestPlayer().score >= service.scoreMax;
  };

  this.getWinner = function(){
    var bestPlayer = PlayersService.getBestPlayer()
    return (bestPlayer.score >= service.scoreMax) ? bestPlayer : undefined;
  };

  this.getLosers = function(){
    return _.filter(PlayersService.getPlayers(), function(p) {
        return p.score != service.getWinner().score;
      });
  }
});
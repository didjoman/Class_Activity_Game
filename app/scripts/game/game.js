"use strict";
angular.module('Game', ['Grid', 'Player', 'Questions', 'Turns'])
.service('GameManager', function($q, $timeout, GridService, PlayersService, QuestionsService, TurnsService) {

  this.grid = GridService.grid;
  this.players = PlayersService.players;
  this.currentPlayer = PlayersService.currentPlayer;
  this.tiles = GridService.tiles;
  this.gameSize = GridService.getSize();

  this.questionsServ = QuestionsService.data;
  this.roundWon = QuestionsService.data.roundWon;
  this.roundWinner = QuestionsService.data.roundWinner;

  this.play = function(){
  	QuestionsService.open('lg', TurnsService.newTurn);
	//service.currentPlayer = PlayersService.getCurrentPlayer();
  };

    // Create a new game
  this.newGame = function(players, size, questions) {
    GridService.initGrid(size, players);
    QuestionsService.init(questions);
    TurnsService.init();
    this.reinit();
  };

  // Reset game state
  this.reinit = function() {
    this.gameOver = false;
    this.win = false;
    this.currentScore = 0;
    this.highScore = 0; // we'll come back to this
  };
});
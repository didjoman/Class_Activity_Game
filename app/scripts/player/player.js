"use strict";
angular.module('Player', ['Questions'])
.factory('PlayerModel', function() {
	var Player = function(pos, id, score, name, img, winImg, color) {
   	this.pos = pos;
  	this.id = id || 0;
   	this.score = score || 0;
   	this.name = name || '';
   	this.img = img || 'default_player.png';
   	this.winImg = winImg || 'default_player.png';
   	this.color = color || 'black';
  };

  return Player;
})
.service('PlayersService', function(PlayerModel, $log, _){
	var service = this;

	this.data = {};
	this.data.players  = [];
	this.data.playerAll = undefined;
	this.data.lastSinglePlayer = undefined;

  this.initPlayers = function(players){
  	for(var i=0; i < players.length; ++i){
  		var newPlayer = service.newPlayer(0, i, 0,
  			players[i].name, players[i].img, players[i].winImg, players[i].color);
  		this.insertPlayer(newPlayer);
  	}
  	service.data.playerAll = service.newPlayer(0, players.length + 1, 0, 'All',
  		'all.png', 'default.png', '#475559');
  };

 	this.getPlayers = function(){
 		return service.data.players;
 	};

 	this.getPlayer = function(id){
 		return service.data.players[id];
 	};

 	this.getPlayerAll = function(){
 		return service.data.playerAll;
 	};

	this.getPlayerId = function(playerName){
 		return _.findIndex(service.data.players, function(p){return p.name === playerName; });
  };

 	this.addPointToPlayer = function(id, nbPoints){
 		if(id !== -1){
  		service.data.players[id].pos += nbPoints;
 			service.data.players[id].score += nbPoints;
 		} else {
 			$log.error('addPointToPlayer(): Can not add point to player n°'+ id + ' (player not fonud)');
 		}

 	};

  this.newPlayer = function(pos, id, score, name, img, winImg, color) {
    return new PlayerModel(pos, id, score, name, img, winImg, color);
  };
	
	this.insertPlayer = function(player) {
		service.data.players.push(player);
  };

})
.controller('PlayersCtrl', function($scope, PlayersService){ 
	$scope.players = PlayersService.players;
	$scope.currentPlayer = PlayersService.getCurrentPlayer();
});
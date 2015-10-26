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

  	this.initPlayers = function(players, isMultiPlayerGame){
  		for(var i=0; i < players.length; ++i){
  			var newPlayer = service.newPlayer(0, i, 0,
  				players[i].name, players[i].img, players[i].winImg, players[i].color);
  			this.insertPlayer(newPlayer);
  			//this.insertPlayer(service.newPlayer(0, i, 0, "All", b));
  		}
  		service.data.playerAll = service.newPlayer(0, players.length + 1, 0, 'All',
  					'all.png', 'default.png', '#475559');
  		/*
  		if(isMultiPlayerGame){
  			service.insertPlayer(
  				service.newPlayer(0, players.length + 1, 0, 'All',
  					'all.png', 'default.png', '#475559')
  			);
  		}
  		*/
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
  		return _.findIndex(service.data.players, function(p){return p.name === playerName});
  	};

/*
  	this.getCurrentPlayer = function(){
  		// The current player is always in head of the list.
  		return service.data.players[0];
  	};

  	this.getCurrentPlayerId = function(){
  		return 0;
  	};

	this.addPointToCurrentPlayer = function(nbPoints){
  		service.addPointToPlayer(service.getCurrentPlayerId(), nbPoints);
  	};
*/
  	this.addPointToPlayer = function(id, nbPoints){
  		if(id !== -1){
	  		service.data.players[id].pos += nbPoints;
  			service.data.players[id].score += nbPoints;
  		} else {
  			$log.error('addPointToPlayer(): Can not add point to player "'+ player.name+ '" (player not fonud)');
  		}

  	};
/*
  	this.changePlayer = function(isMulti){
  		var player;
  		if(isMulti){
  			// Remove the player named "All"
	  		player = _.pullAt(service.data.players, 
	  							_.findIndex(service.data.players, 
	  								function(p){return p.name === 'All'; }))[0];
  		} else {
	  		var nextId = (service.getCurrentPlayer().id + 1) % service.data.players.length;
			if(service.data.players[nextId].name === 'All')
	  			nextId = (service.getCurrentPlayer().id + 2) % service.data.players.length;
	  		// Remove the next player of the list
	  		player = service.data.players.splice(nextId, 1)[0];
  		}
	  	// Insert the current player in head.
	  	service.data.players.unshift(player);
  	};

  	this.moveForwardCurrentPlayer = function(){
  		++(service.getCurrentPlayer().pos);
  	};
*/

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
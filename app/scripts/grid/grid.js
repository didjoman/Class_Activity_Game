"use strict";
angular.module('Grid', ['Player'])
.directive('tile', function() {
  return {
    restrict: 'A',
    scope: {
      ngModel: '='
    },
    templateUrl: 'scripts/grid/tile.html'
  };
})
.service('GridService', function(PlayerModel, PlayersService) {
	var service = this;

	// Size of the board
	this.size   = 20;

	this.grid   = [];
	this.players = PlayersService.data.players;

	this.getSize = function(){
		return service.size;
	};

	this.setSize = function(sz) {
    	this.size = sz ? sz : 0;
  	};
  
	this.initGrid = function(size, players) {
	    service.size = size;

	    PlayersService.initPlayers(players);

	    // Initialize our grid
	    for (var x = 0; x < service.size; x++) {
	    	this.grid[x] = [];
	    }

	    // Add the players on first cell : 
		for(var i=0; i < players.length; ++i){
	  		service.grid[0].push(service.players[i]);
  		}
	};    

	this.updatePlayerPos = function(id){
		var player = PlayersService.getPlayer(id);
		// Remove the current player from the grid
		for(var i = 0; i < service.grid.length; ++i){
			for(var j = 0; j < service.grid[i].length; ++j){
				if(service.grid[i][j].name === player.name){
					service.grid[i].splice(j,1);
					break;
				}
			}
		}
		// Re-insert the current player at the good position
		service.grid[player.pos].push(player);
	};

});
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
.service('GridService', function(PlayerModel, PlayersService, _) {
	var service = this;

	// Size of the board
	this.size   = 20;

	this.startingTileNumber = 2;
	// ...
	this.grid   = [];
	this.players = PlayersService.data.players;
/*
  	this.$get = function(PlayerModel) {
	    this.grid   = [];
	    this.players  = [];

	    // Private things
	    var vectors = {
	      'left': { x: -1, y: 0 },
	      'right': { x: 1, y: 0 },
	      'up': { x: 0, y: -1 },
	      'down': { x: 0, y: 1 }
	    };
	};
*/

	this.getSize = function(){
		return service.size;
	};

	this.setSize = function(sz) {
    	this.size = sz ? sz : 0;
  	};
  
	this.initGrid = function(size, players, multi) {
	    service.size = size;

	    PlayersService.initPlayers(players, multi);

	    // Initialize our grid
	    for (var x = 0; x < service.size; x++) {
	    	this.grid[x] = [];
	    }

	    // Add the players on first cell : 
		for(var i=0; i < players.length; ++i){
	  		service.grid[0].push(service.players[i]);
  		}

	};    

	this.updateCurrentPlayerPos = function(){
		service.updatePlayerPos(PlayersService.getCurrentPlayer().id);
	}

	this.updatePlayerPos = function(id){
		var player = PlayersService.getPlayer(id);
		// Remove the current player from the grid
		for(var i = 0; i < service.grid.length; ++i){
			//_.index(service.grid[i], function(p){
			//	p.name == player.name;
			//});
			for(var j = 0; j < service.grid[i].length; ++j){
				if(service.grid[i][j].name === player.name){
					service.grid[i].splice(j,1);
					break;
				}
			}

		}
		// Re-insert the current player at the good position
		service.grid[player.pos].push(player);
	}

	// Run a method for each element in the players array
	this.forEach = function(cb) {
	  var totalSize = this.size * this.size;
	  for (var i = 0; i < totalSize; i++) {
	    var pos = this._positionToCoordinates(i);
	    cb(pos.x, pos.y, this.players[i]);
	  }
	};

	// Set a cell at position
	this.setCellAt = function(pos, tile) {
	  if (this.withinGrid(pos)) {
	    var xPos = this._coordinatesToPosition(pos);
	    this.players[xPos] = tile;
	  }
	};

	// Fetch a cell at a given position
	this.getCellAt = function(pos) {
	  if (this.withinGrid(pos)) {
	    var x = this._coordinatesToPosition(pos);
	    return this.players[x];
	  } else {
	    return null;
	  }
	};

	// A small helper function to determine if a position is
	// within the boundaries of our grid
	this.withinGrid = function(cell) {
	  return cell.x >= 0 && cell.x < this.size &&
	          cell.y >= 0 && cell.y < this.size;
	};

	// Helper to convert x to x,y
	this._positionToCoordinates = function(i) {
	  var x = i % service.size,
	      y = (i - x) / service.size;
	  return {
	    x: x,
	    y: y
	  };
	};

	// Helper to convert coordinates to position
	this._coordinatesToPosition = function(pos) {
	  return (pos.y * service.size) + pos.x;
	};


    /*
     * Remove a tile
     */
    this.removeTile = function(pos) {
      pos = this._coordinatesToPosition(pos);
      delete this.players[pos];
    };

});
var _ = require('underscore');

(function(exports, _){

   	exports.island = function(){
        var island = {};

        island.current_day = 1;
        island.dinos = [];

        island.add_dino = function(dino){
        	this.dinos.push(dino);
        }
        island.next = function(){
        	var sortedDinos = _.sortBy(this.dinos, function(dino){return dino.speed});
        	var aliveDinos = _.where(sortedDinos, {is_alive:true});
        	for(var i = 0; i < aliveDinos.length; i++){
        		aliveDinos[i].brain();
        		aliveDinos[i].wait();
        	}
        	this.current_day++;
        };

        island.dino_alive_count = function(){
        	return _.where(this.dinos, {is_alive:true}).length;
        };

        island.dino_dead_count = function(){
        	return _.where(this.dinos, {is_alive:false}).length;
        }

        return island;
    };

})(typeof exports === 'undefined'? this['mymodule']={}: exports, _);
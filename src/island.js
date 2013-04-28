var _ = require('underscore');
var fs = require('fs');

(function(exports, _){

    var cord = function(x,y){
        this.x = x;
        this.y = y;
        this.vegitation_calories = 0;
    }

    var gen_map = function(island_path){
        var data = fs.readFileSync(island_path, 'utf8');
        var data_arr = data.split("");
        var row = 0;
        var map = [];
        var land = [];
        map[0] = [];


        for(var i = 0; i < data_arr.length; i++){
            if(data_arr[i] == '\n'){
                row++;
                map[row] = [];
            } else {
                map[row].push(data_arr[i]);
                if(data_arr[i] == '.'){
                    land.push(new cord(row, i));
                }
            }
        }
        return {map: map, land:land};
    }

   	exports.island = function(island_path, vegitable_calories, percentage_plant, point_decay_per_turn){

        if(!percentage_plant)percentage_plant = 10;
        if(!point_decay_per_turn)point_decay_per_turn = 10;

        var island = {};

        island.percentage_plant = percentage_plant;
        island.point_decay_per_turn = point_decay_per_turn;
        island.vegitable_calories = vegitable_calories;
        island.map = gen_map(island_path);
        island.current_day = 1;
        island.dinos = [];

        island.add_dino = function(dino){
        	this.dinos.push(dino);
        };

        island.next = function(){
        	var sortedDinos = _.sortBy(this.dinos, function(dino){return dino.speed});
        	var aliveDinos = _.where(sortedDinos, {is_alive:true});
        	for(var i = 0; i < aliveDinos.length; i++){
        		aliveDinos[i].brain();
        		aliveDinos[i].wait();
        	}
        	this.current_day++;
        };

        island.grow = function(){
            if(this.percentage_plant < 0){
                return;
            }

            var new_vegitation_count = Math.ceil(this.map.land.length * this.percentage_plant);

            for(var i = 0; i < new_vegitation_count; i++){
                var randomland = this.map.land[Math.floor(Math.random() * this.map.land.length)];
                randomland.vegitation_calories = randomland.vegitation_calories + this.vegitable_calories;
            }

            this.percentage_plant = this.percentage_plant - point_decay_per_turn;
        };

        island.count = function(count){
            switch(count){
                case 'alive':
                    return _.where(this.dinos, {is_alive:true}).length;
                break;

                case 'dead':
                    return _.where(this.dinos, {is_alive:false}).length;
                break;

                case 'vegitation_calories':
                    var sum = _.reduce(this.map.land, function(memo, land){ return memo + land.vegitation_calories; }, 0);
                    return sum;
                break;

                case 'land':
                    return this.map.land.length;
                break;

                default:
                    return NaN;
                break;
            }
        }



        island.dino_dead_count = function(){
        	return _.where(this.dinos, {is_alive:false}).length;
        };

        return island;
    };

})(typeof exports === 'undefined'? this['mymodule']={}: exports, _);
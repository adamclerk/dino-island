var _ = require('underscore');
var fs = require('fs');

(function(exports, _){

    var cord = function(x,y){
        this.x = x;
        this.y = y;
        this.point = function(){
            return this.x + "," + this.y;
        }
        this.vegitation_calories = 0;
        this.dino_count = 0;
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

   	exports.island = function(options){

        if(!options){
            var options = {};
        }

        var o = {
            island_path: "./islands/local.medium.island",
            vegitable_calories: 50,
            percentage_plant:.20,
            point_decay_per_turn:.20,
            waiting_calories:5,
            walking_calories:5,
            eating_calories:5,
            looking_calories:10
        }

        o = _.extend(o, options);

        var island = {};

        island.percentage_plant = o.percentage_plant;
        island.point_decay_per_turn = o.point_decay_per_turn;
        island.vegitable_calories = o.vegitable_calories;
        island.map = gen_map(o.island_path);
        island.current_day = 1;
        island.dinos = [];

        island.add_dino = function(dino){
            var randomland = this.randomland();
            while(randomland.dino_count > 0){
                randomland = this.randomland();
            }
            randomland.dino_count++;
            dino.location = randomland;
        	this.dinos.push(dino);
        };

        island.next = function(){
        	var sortedDinos = _.sortBy(this.dinos, function(dino){return dino.speed});
        	var aliveDinos = _.where(sortedDinos, {is_alive:true});
        	for(var i = 0; i < aliveDinos.length; i++){
        		if(aliveDinos[i].calories < 0){
                        aliveDinos[i].is_alive = false;
                } else {
                    var result = aliveDinos[i].brain();

            		if(result.action == 'wait'){
                        aliveDinos[i].calories = aliveDinos[i].calories - 5
                    } else if(result.action == 'walk'){

                    }
                }
        	}
        	this.current_day++;
        };

        island.grow = function(){
            if(this.percentage_plant < 0){
                return;
            }

            var new_vegitation_count = Math.ceil(this.map.land.length * this.percentage_plant);

            for(var i = 0; i < new_vegitation_count; i++){
                var randomland = this.randomland();
                randomland.vegitation_calories = randomland.vegitation_calories + this.vegitable_calories;
            }

            this.percentage_plant = this.percentage_plant - this.point_decay_per_turn;
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

        island.randomland = function(){
            var randomland = this.map.land[Math.floor(Math.random() * this.map.land.length)];
            return randomland;
        }



        island.dino_dead_count = function(){
        	return _.where(this.dinos, {is_alive:false}).length;
        };

        return island;
    };

})(typeof exports === 'undefined'? this['mymodule']={}: exports, _);
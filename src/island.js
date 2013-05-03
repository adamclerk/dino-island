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
            looking_calories:10,
            dino_types:[
                {
                    name:'carnivore',
                    calories:300,
                    max_combined:10
                }, 
                {
                    name:'herbivore',
                    calories:500,
                    max_combined:10
                }
            ]
        }

        o = _.extend(o, options);

        var island = {};
        island.options = o;
        island.map = gen_map(o.island_path);
        island.current_day = 1;
        island.dinos = [];
        island.history = [];
        island.started = false;

        island.spawn = function(dino){

            var duplicate = _.findWhere(this.dinos, {name: dino.name});

            if(duplicate){
                dino.is_alive = false;
                dino.death_reason = "Your dino dies of a generic abnormality: You've already spawned on this island."
                return;
            }

            dino.type = _.findWhere(this.options.dino_types, {name: dino.type_name});
            if(dino.type == undefined){
                this.dinos.push(dino);
                dino.is_alive = false;
                dino.death_reason = "Your dino dies of a generic abnormality: This island doesn't support this type."
                return;
            }

            if((dino.height + dino.speed) > dino.type.max_combined){
                this.dinos.push(dino);
                dino.is_alive = false;
                dino.death_reason = "Your dino died of a genetic abnormality: Attributes Invalid."
                return;
            }

            if(typeof(dino.brain) != 'function'){
                this.dinos.push(dino);
                dino.is_alive = false;
                dino.death_reason = "Your dino died of a genetic abnormality: Brain not found."
            }

            var randomland = this.randomland();
            while(randomland.dino_count > 0){
                randomland = this.randomland();
            }
            randomland.dino_count++;
            dino.location = randomland;
            dino.calories = dino.type.calories;
        	this.dinos.push(dino);
        };

        island.start = function(){
            this.started = true;
            this.dinos = _.sortBy(this.dinos, function(dino){return dino.speed});
        }

        island.find = function(name){
            return _.findWhere(this.dinos, {name: name});
        }

        island.next_day = function(){
        	for(var i = 0; i < this.dinos.length; i++){
                var dino = this.dinos[i];
                if(dino.is_alive){
            		if(dino.calories < 0){
                            dino.is_alive = false;
                    } else {
                        var result = dino.brain();

                        switch(result.action){
                            case 'wait':
                                dino.outcome = {};
                                dino.calories = dino.calories - this.options.waiting_calories;
                            break;
                            case 'move':
                                dino.outcome = {};
                            break;
                            case 'eat':
                                dino.outcome = {}
                            break;
                            case 'look':
                                dino.outcome = this.getradius(dino.location, dino.speed);
                            break;
                            default:
                                dino.outcome = {};
                                dino.calories = aliveDinos[i].calories - this.options.waiting_calories;
                            break;
                        }
                    }
                }
        	}
            this.history[this.current_day] = JSON.parse(JSON.stringify(this.dinos));
        	this.current_day++;
        };

        island.grow = function(){
            if(this.options.percentage_plant < 0){
                return;
            }

            var new_vegitation_count = Math.ceil(this.map.land.length * this.options.percentage_plant);

            for(var i = 0; i < new_vegitation_count; i++){
                var randomland = this.randomland();
                randomland.vegitation_calories = randomland.vegitation_calories + this.options.vegitable_calories;
            }

            this.options.percentage_plant = this.options.percentage_plant - this.options.point_decay_per_turn;
        };

        island.getradius = function(location, radius){

            var surroundings = [];
            var x_min = location.x - radius;
            var y_min = location.y - radius;
            var x_max = location.x + radius;
            var y_max = location.y + radius;
            var x_index = 0;
            var y_index = 0;

            for(var x = x_min; x <= x_max; x++){   
                surroundings[x_index] = [];
                for(var y = y_min; y <= y_max; y++){
                    surroundings[x_index][y_index] = new cord(x, y);
                    y_index++;
                }
                x_index++;
            }
            return {surroundings: surroundings};
        }

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
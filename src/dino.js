var _ = require('underscore');
(function(exports, _){

	exports.dino = function(name, type, height, speed, brain){
		var dino = {};
		dino.name = name;
		dino.height = height;
		dino.speed = speed;
		dino.brain = brain;
		dino.type_name = type;
		dino.is_alive = true;
		dino.death_reason = "";

		dino.set_location = function(x, y){
			this.x = x;
			this.y = y;
		}

		return dino;
	};

})(typeof exports === 'undefined'? this['dino']={}: exports, _);
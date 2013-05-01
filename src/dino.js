var _ = require('underscore');
(function(exports, _){

	var dinoTypes = [
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
	];

	exports.dino = function(name, type, height, speed, brain){
		var dino = {};
		dino.name = name;
		dino.height = height;
		dino.speed = speed;
		dino.brain = brain;
		dino.type = _.findWhere(dinoTypes, {name:type});
		dino.is_alive = true;

		dino.set_location = function(x, y){
			this.x = x;
			this.y = y;
		}
		
		if(typeof(dino.brain) != 'function'){
			throw new Error('Your dino dies of a generic abnormality: No brain found.');
		}

		if(!dino.type){
			throw new Error('Your dino dies of a generic abnormality: Not carnivore or herbivore.');
		}

		dino.calories = dino.type.calories;

		if(dino.speed + dino.height > dino.type.max_combined){
			throw new Error('Your dino died of a genetic abnormality: Too tall & too fast.');
		}

		return dino;
	};

})(typeof exports === 'undefined'? this['dino']={}: exports, _);
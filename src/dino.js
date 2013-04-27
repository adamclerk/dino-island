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

	var dinoActions = [
		{
			name:'look',
			fn:function(){
				this.calories = this.calories - 5;
				return 'looking';
			}
		},
		{
			name:'walk',
			fn:function(direction, steps){
				this.calories = this.calories - (5 * steps);
				return 'walking';
			}
		},
		{
			name:'eat',
			fn:function(current_location){
				this.calories = this.calories - 5;
				return 'eating';
			}
		},
		{
			name:'wait',
			fn:function(){
				this.calories = this.calories - 5;
				if(this.calories <= 0){
					this.is_alive = false;
				}
				return 'waiting'
			}
		}
	]

	exports.dino = function(name, type, height, speed, brain){
		var dino = {};
		dino.name = name;
		dino.height = height;
		dino.speed = speed;
		dino.look = _.findWhere(dinoActions, {name:'look'}).fn;
		dino.walk = _.findWhere(dinoActions, {name:'walk'}).fn;
		dino.eat = _.findWhere(dinoActions, {name:'eat'}).fn;
		dino.wait = _.findWhere(dinoActions, {name:'wait'}).fn;
		dino.brain = brain;
		dino.type = _.findWhere(dinoTypes, {name:type});
		dino.is_alive = true;

		if(typeof(dino.brain) != 'function'){
			throw new Error('Your dino dies of a generic abnormality: No brain found.');
		}

		if(!dino.type){
			throw new Error('Your dino dies of a generic abnormality: Not carnivore or herbivore.');
		}

		if(dino.speed + dino.height > dino.type.max_combined){
			throw new Error('Your dino died of a genetic abnormality: Too tall & too fast.');
		}

		return dino;
	};

})(typeof exports === 'undefined'? this['dino']={}: exports, _);
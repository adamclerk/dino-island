var should = require('should');
var Dino = require('../src/dino').dino;
var Island = require('../src/island').island;

describe('dino', function() {
	var dino;
    var island;

	beforeEach(function(){
		dino = new Dino('trex', 'carnivore', 5, 5, 
			function(dino){return "living"}
			);
        island = new Island();
	});
    it('should be described with constructor', function(){
    	dino.name.should.equal('trex');
    	dino.height.should.equal(5);
    	dino.speed.should.equal(5);
    });

    it('should die if spawned with invalid height and speed', function(){
		var d = new Dino('trex', 'carnivore', 5, 6, function(dino){});	
        island.spawn(d);
        d.death_reason.should.equal('Your dino died of a genetic abnormality: Attributes Invalid.');
    });

    it('should die if created with invalid species', function(){
		var d =  Dino('trex', 'happy', 5, 5, function(dino){});	
        island.spawn(d);
        d.death_reason.should.equal('Your dino dies of a generic abnormality: This island doesn\'t support this type.');
    	   
    });

    it('should die if created without a brain', function(){
		var d = new Dino('trex', 'herbivore', 5, 5);	
        island.spawn(d);
        d.death_reason.should.equal('Your dino died of a genetic abnormality: Brain not found.');
    });

    it('should have outcome after looking', function(){
        dino.brain = function(dino){
            return {action:'look'}
        }

        island.spawn(dino);
        island.next_day();
        var d = island.find('trex');

        //TODO: FIX THIS TEST
        should.exist(d.outcome);
        d.outcome.surroundings.length.should.equal(11);
        d.outcome.surroundings[0].length.should.equal(11)
    });
    it('should have outcome after eating', function(){
        dino.brain = function(dino){
            return {action:'eat'}
        }

        island.spawn(dino);
        island.next_day();
        var d = island.find('trex');
        should.exist(d.outcome);
    });
    it('should have outcome after moving', function(){
        dino.brain = function(dino){
            return {action:'move', direction:'n'}
        }

        island.spawn(dino);
        island.next_day();
        var d = island.find('trex');
        should.exist(d.outcome);
    });

    it('should have a location from the start');    
});
var should = require('should');
var Dino = require('../src/dino').dino;

describe('dino', function() {
	var dino;

	beforeEach(function(){
		dino = new Dino('trex', 'carnivore', 5, 5, 
			function(dino){return "living"}
			);
	});
    it('should be created with constructor', function(){
    	dino.name.should.equal('trex');
    	dino.height.should.equal(5);
    	dino.speed.should.equal(5);
    });

    it('should die if created with invalid height and speed', function(){
    	(function(){
    		new Dino('trex', 'carnivore', 5, 6, function(dino){});	
    	}).should.throw("Your dino died of a genetic abnormality: Too tall & too fast.");
    });

    it('should die if created with invalid species', function(){
    	(function(){
    		new Dino('trex', 'happy', 5, 5, function(dino){});	
    	}).should.throw("Your dino dies of a generic abnormality: Not carnivore or herbivore.");
    });

    it('should die if created without a brain', function(){
    	(function(){
    		new Dino('trex', 'herbivore', 5, 5);	
    	}).should.throw("Your dino dies of a generic abnormality: No brain found.");
    });
});
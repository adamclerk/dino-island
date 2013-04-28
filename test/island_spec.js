var should = require('should');
var Island = require('../src/island').island;
var Dino = require('../src/dino').dino;

describe('island', function() {
	var i;

	beforeEach(function(){
        i = new Island('./islands/lost.small.island', 50, .20, .20);
	});

    it('should be span a dino', function(){
        var d = new Dino('trex', 'carnivore', 5,5,function(dino){})
        i.add_dino(d);
        i.count('alive').should.equal(1);
    });

    it('should be go to next day', function(){
        i.next();
        i.current_day.should.equal(2);
    });

    it('should be able to kill a lazy dino', function(){
        var d = new Dino('trex', 'carnivore', 5, 5, function(dino){})
        i.add_dino(d);
        i.count('alive').should.equal(1);
        i.count('dead').should.equal(0);
        for(var j = 0; j < 62; j++){
            i.next();
        }
        i.count('alive').should.equal(0);
        i.count('dead').should.equal(1);
    });

    it('should generate an island with land', function(){
        i.map.should.not.be.null;
        i.map.land.length.should.equal(180);
        
    });

    it('should generate an island with a map', function(){
        i.map.should.not.be.null;
        i.map.map.length.should.equal(15);
        i.map.map[0].length.should.equal(22);
    });

    it('should grow new vegitation', function(){
        i.grow();
        i.count('vegitation_calories').should.equal(1800);
    })
});
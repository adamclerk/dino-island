var should = require('should');
var Island = require('../src/island').island;
var Dino = require('../src/dino').dino;

describe('island', function() {
	var i;

	beforeEach(function(){
        i = new Island();
	});

    it('should be span a dino', function(){
        var d = new Dino('trex', 'carnivore', 5,5,function(dino){})
        i.add_dino(d);
        i.dino_alive_count().should.equal(1);
    });

    it('should be go to next day', function(){
        i.next();
        i.current_day.should.equal(2);
    });

    it('should be able to kill a lazy dino', function(){
        var d = new Dino('trex', 'carnivore', 5, 5, function(dino){})
        i.add_dino(d);
        i.dino_alive_count().should.equal(1);
        i.dino_dead_count().should.equal(0);
        for(var j = 0; j < 61; j++){
            i.next();
        }

        i.dino_alive_count().should.equal(0);
        i.dino_dead_count().should.equal(1);


    })
});
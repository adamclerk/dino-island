var should = require('should');
var Island = require('../src/island').island;
var Dino = require('../src/dino').dino;

describe('island', function() {
	var i;

	beforeEach(function(){
        i = new Island({island_path:'./islands/lost.small.island', vegitable_calories:50, percentage_plant: .20, point_decay_per_turn: .20});
	});

    it('should be spawn a dino', function(){
        var d = new Dino('trex', 'carnivore', 5,5,function(dino){})
        i.spawn(d);
        i.count('alive').should.equal(1);
    });

    it('should be able to find a dino', function(){
        var d = new Dino('trex', 'carnivore', 5,5,function(dino){})
        i.spawn(d);
        var found = i.find('trex');
        found.name.should.equal(d.name);
        found.type.should.equal(d.type);
    })

    it('should be go to next day', function(){
        i.next_day();
        i.current_day.should.equal(2);
    });

    it('should be able to kill a lazy dino', function(){
        var d = new Dino('trex', 'carnivore', 5, 5, function(dino){return {action:'wait'}})
        i.spawn(d);
        i.count('alive').should.equal(1);
        i.count('dead').should.equal(0);
        for(var j = 0; j < 62; j++){
            i.next_day();
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
    });

    it('should add a dinos to a random locations', function(){
        for(var j = 0; j < 30; j++){
            var d = new Dino('trex' + j.toString(), 'carnivore', 5, 5, function(dino){return {action:'wait'}})
            i.spawn(d);
        }
        for(var j = 0; j < 29; j++){
            i.dinos[j].location.point().should.not.equal(i.dinos[j+1].location.point());    
        }
        
    })
});
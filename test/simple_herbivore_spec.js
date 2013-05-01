var should = require('should');
var Island = require('../src/island').island;
var Dino = require('../src/dino').dino;

describe('simple herbivore', function() {
	var i;
    var h;

	beforeEach(function(){
        i = new Island('./islands/lost.small.island', 50, .20, .20);
        var d = new Dino('trex', 'herbivore', 5,5,function(dino){

        });
	});
});

/*
 * GET home page.
 */

exports.index = function(req, res){
  	res.render('index', {title: 'Dino Island'});
};

exports.dino = function(req, res){
	res.render('dino', {title: 'Your Dino'});
};

exports.results = function(req, res){
	res.render('results', {title: 'Results'});
};

exports.resultspast = function(req, res){
	res.render('resultspast', {title: 'Past Results'});
}
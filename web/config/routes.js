// Set up routes for the app

module.exports = function(app) {

	var dino = require('../app/controllers/dino');
	app.get('/', dino.index);
	app.get('/dino', dino.dino);
	app.get('/results', dino.results);
	app.get('/results/past', dino.resultspast);
}

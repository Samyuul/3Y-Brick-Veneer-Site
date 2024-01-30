module.exports = app => {

	const orders = require("../controllers/order.controllers.js");
	const stock  = require("../controllers/stock.controllers.js");
	
	var router = require("express").Router(); 

	// Create a new order
	router.post("/orders", orders.create);

	// Stock routes //
	router.get("/stock/:id", stock.getStock)

	app.use('/api', router); // Use .../api/ as prefix for routes
};

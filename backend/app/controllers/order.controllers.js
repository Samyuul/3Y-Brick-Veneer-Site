// Import modules
const db = require("../model"); // Index file
const Order = db.orders;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {

    const order = req.body

    // Backend Validation
    

    const curr_order = {
        name: order.name, 
		number: order.phone, 
        white: order.quantity[0],
        sand: order.quantity[1],
        red: order.quantity[2],
        peach: order.quantity[3],
        gray: order.quantity[4],
        darkBrown: order.quantity[5],
        coffee: order.quantity[6],
        mixedBrown: order.quantity[7],
        mixedIndoor: order.quantity[8],
        corners: order.quantity[9],
        sqft: order.sqft,
        cost: order.cost
    }

    Order.create(curr_order)
    .then(data => {
        res.send(data);
    }) // Success
    .catch(err => {
        console.log(err.message);
        res.status(500).send({message: "Error Occured While Creating Order"})
    }) // Error

} // create
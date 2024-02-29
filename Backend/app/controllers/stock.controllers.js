// Import modules
const db = require("../model");
const Stock = db.stock;
const Op = db.Sequelize.Op;

exports.getStock = (req, res) => {

    const id = req.params.id;    

    Stock.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: "Stock not found"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving stock"
        })
    })

} // getStock
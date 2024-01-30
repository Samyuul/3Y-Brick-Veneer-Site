const dbConfig = require("./../config/db.config.js"); // Import config for the database
const Sequelize = require("sequelize");               // Import sequelize

// Setup connection to databse
const sequelize_model = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operatorsAliases: false,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle
	}
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize_model = sequelize_model;
db.orders = require("./order.model.js")(sequelize_model, Sequelize);
db.stock = require("./stock.model.js")(sequelize_model, Sequelize);

module.exports = db;

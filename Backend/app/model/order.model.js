// Define Tutorial Class for Database
module.exports = (sequelize_model, Sequelize) => {

	const cust_order = sequelize_model.define("order", {
		
		name: {
			type: Sequelize.STRING
		},

		number: {
			type: Sequelize.STRING
		},

		white: {
			type: Sequelize.INTEGER
		},

		sand: {
			type: Sequelize.INTEGER
		},

		red: {
			type: Sequelize.INTEGER
		},

		peach: {
			type: Sequelize.INTEGER
		},

		gray: {
			type: Sequelize.INTEGER
		},

		darkBrown: {
			type: Sequelize.INTEGER
		},

		coffee: {
			type: Sequelize.INTEGER
		},

		mixedBrown: {
			type: Sequelize.INTEGER
		},

		mixedIndoor: {
			type: Sequelize.INTEGER
		},

		corner: {
			type: Sequelize.INTEGER
		},

		sqft: {
			type: Sequelize.FLOAT		
		},

		cost: {
			type: Sequelize.FLOAT
		}
	});

	return cust_order;
};

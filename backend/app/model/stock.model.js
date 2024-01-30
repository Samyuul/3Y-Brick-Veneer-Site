// Define Tutorial Class for Database
module.exports = (sequelize_model, Sequelize) => {

	const total_stock = sequelize_model.define("stock", {

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
		}
	},
	{
		timestamps: false
	});

	return total_stock;
};

export default (sequelize, DataTypes) => {
	const Damages = sequelize.define('damages', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		repairCode: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
		manhours: {
			type: DataTypes.FLOAT,
		},

		materialCost: {
			type: DataTypes.INTEGER,
		},
	})
	Damages.associate = models => {
		Damages.belongsTo(models.User, { as: 'addedby' })
	}
	return Damages
}

export default (sequelize, DataTypes) => {
	const Operator = sequelize.define('operator', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		operatorCode: {
			type: DataTypes.STRING,
		},

		operatorName: {
			type: DataTypes.STRING,
		},
	})
	Operator.associate = models => {
		Operator.belongsTo(models.User, { as: 'addedby' })
	}
	return Operator
}

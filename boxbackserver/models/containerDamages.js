export default (sequelize, DataTypes) => {
	const ContainerDamages = sequelize.define('containerDamages', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		DamageCode: {
			type: DataTypes.STRING,
		},
		BLNumber: {
			type: DataTypes.STRING,
		},
		preadviseNum: {
			type: DataTypes.STRING,
		},
		containerNum: {
			type: DataTypes.STRING,
		},
	})
	ContainerDamages.associate = models => {
		ContainerDamages.belongsTo(models.User, { as: 'addedby' })
	}

	return ContainerDamages
}

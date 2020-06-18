export default (sequelize, DataTypes) => {
	const Client = sequelize.define('client', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		clientCode: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
		clientName: {
			type: DataTypes.STRING,
		},
		clientPhone: {
			type: DataTypes.STRING,
		},
		clientEmailAddress: {
			type: DataTypes.STRING,
		},
		clientAddress: {
			type: DataTypes.STRING,
		},
		clientContact: {
			type: DataTypes.STRING,
		},
		clientKraPin: {
			type: DataTypes.STRING,
		},
	})
	Client.associate = models => {
		Client.belongsTo(models.User, { as: 'addedby' })
	}
	return Client
}

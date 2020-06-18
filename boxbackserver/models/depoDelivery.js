export default (sequelize, DataTypes) => {
	const DeliveryDepo = sequelize.define('deliveryDepo', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		clientName: {
			type: DataTypes.STRING,
		},
		clientCode: {
			type: DataTypes.STRING,
		},
	})
	DeliveryDepo.associate = models => {}
	return DeliveryDepo
}

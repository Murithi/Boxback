export default (sequelize, DataTypes) => {
	const PrestackCompany = sequelize.define('prestackCompany', {
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
	PrestackCompany.associate = models => {}
	return PrestackCompany
}

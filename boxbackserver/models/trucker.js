export default (sequelize, DataTypes) => {
	const Trucker = sequelize.define('trucker', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		truckerName: {
			type: DataTypes.STRING,
		},
		truckerLongName: {
			type: DataTypes.STRING,
		},
		truckerCode: {
			type: DataTypes.STRING,
		},
		telNo: {
			type: DataTypes.STRING,
		},
		faxNo: {
			type: DataTypes.STRING,
		},
		zipCode: {
			type: DataTypes.STRING,
		},
		address: {
			type: DataTypes.STRING,
		},
	})
	Trucker.associate = models => {}
	return Trucker
}

export default (sequelize, DataTypes) => {
	const Container = sequelize.define('container', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		containerCode: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
		containerSize: {
			type: DataTypes.STRING,
		},
	})

	return Container
}

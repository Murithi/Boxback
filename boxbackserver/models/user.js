export default (sequelize, DataTypes) => {
	const User = sequelize.define('user', {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4,
		},
		firstName: {
			type: DataTypes.STRING,
		},
		lastName: {
			type: DataTypes.STRING,
		},
		userRole: {
			type: DataTypes.ENUM,
			values: [
				'CUSTOMERSERVICEMSA',
				'CUSTOMERSERVICENRB',
				'OPERATIONSNRB',
				'OPERATIONSMSA',
				'SUPERVISOR',
				'ACCOUNTANT',
				'SUPERUSER',
				'DIRECTOR',
				'ADMIN',
			],
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		locked: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
		authorized: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
		confirmed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
	})

	User.associate = models => {}
	return User
}

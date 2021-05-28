module.exports = (sequelize, DataTypes, Model) => {
	class User extends Model { }
	User.init({
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(255),
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'users',
		sequelize,
		modelName: 'User',
		timestamps: false,
	});

	return User;
};
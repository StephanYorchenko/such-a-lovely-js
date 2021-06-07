const md5 = require('md5');


module.exports = (sequelize, DataTypes, Model) => {
	class User extends Model { 
		validatePassword(password) {
			const salt = process.env['SECRET_SALT'] || 'bad salt';
			const salted = password + salt;

			return this.password === md5(salted);
		}
	}
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
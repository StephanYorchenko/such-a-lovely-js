module.exports = (sequelize, DataTypes, Model) => {
	class UserRefreshToken extends Model { }
	UserRefreshToken.init({
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		expiredAt: {
			type: DataTypes.DATE,
			field: 'expired_at',
			allowNull: false,
		}
	}, {
		modelName: 'UserRefreshTokens',
		tableName: 'user_refresh_tokens',
		sequelize,

		timestamps: false,
	});

	return UserRefreshToken;
};
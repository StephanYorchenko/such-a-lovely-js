module.exports = (sequelize, DataTypes, Model) => {
	class UserAnswer extends Model { }
	UserAnswer.init({
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		answers: {
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: false,
		}
	}, {
		modelName: 'UserQuestionRel',
		tableName: 'user_answers',
		sequelize,

		timestamps: true,
		createdAt: 'created_at',
		updatedAt: false,
	});

	return UserAnswer;
};
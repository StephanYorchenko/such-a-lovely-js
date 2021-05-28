module.exports = (sequelize, DataTypes, Model) => {
	class UserAnswer extends Model { }
	UserAnswer.init({
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		answerText: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'answer_text',
			unique: 'unique_ans',
		},
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
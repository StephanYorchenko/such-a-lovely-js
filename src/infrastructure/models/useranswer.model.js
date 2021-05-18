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
		},
		userId: {
			type: DataTypes.UUID,
			allowNull: false,
			field: 'user_id',
			references: {
				model: 'Users',
				key: 'id',
			}
		},
		questionId: {
			type: DataTypes.UUID,
			allowNull: false,
			field: 'question_id',
			references: {
				model: 'Questions',
				key: 'id',
			}
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
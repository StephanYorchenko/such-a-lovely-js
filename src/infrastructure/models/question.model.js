module.exports = (sequelize, DataTypes, Model) => {
	class Question extends Model { }
	Question.init({
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		questionTitle: {
			type: DataTypes.STRING(255),
			field: 'question_title',
			allowNull: false,
		},
		questionDescription: {
			type: DataTypes.STRING,
			field: 'question_description',
			allowNull: true,
		},
		questionType: {
			type: DataTypes.ENUM('MULTI_CHOICE', 'SINGLE_CHOICE', 'TEXTUAL_QUESTION'),
			field: 'question_type',
			allowNull: false,
		},
		options: {
			type: DataTypes.ARRAY(DataTypes.STRING(255)),
			allowNull: true,
		},
		closed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false,
		},
		config: {
			type: DataTypes.ENUM('radio', 'checkbox'),
			allowNull: false,
			defaultValue: 'radio',
		},
		bgColor: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: 'bg-dark',
		},
		textColor: {
			type: DataTypes.ENUM('text-white', 'text-dark'),
			allowNull: true,
			defaultValue: 'text-white',
		}
	}, {
		sequelize,
		tableName: 'questions',
		modelName: 'Question',

		timestamps: true,
		createdAt: 'created_at',
		updatedAt: false,
	});

	return Question;
};

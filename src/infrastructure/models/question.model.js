module.exports = (sequelize, DataTypes, Model) => {
	class Question extends Model { 
		static formatDate(date) {
			const dd = String(date.getDate()).padStart(2, '0');
			const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
			const yyyy = date.getFullYear();
	
			return dd + '-' + mm + '-' + yyyy;
		}

		getDtoForFront() {
			const dto = this.get();
			dto.style = {
				bg: this.bgColor,
				text: this.textColor,
			};
			dto.createdAt = Question.formatDate(this.createdAt);

			return dto;
		}
	}
	Question.init({
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		title: {
			type: DataTypes.STRING(255),
			field: 'question_title',
			allowNull: false,
		},
		description: {
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
			type: DataTypes.ENUM('text-white', 'text-black'),
			allowNull: true,
			defaultValue: 'text-white',
		}
	}, {
		sequelize,
		tableName: 'questions',
		modelName: 'Question',

		timestamps: true,
		createdAt: true,
		updatedAt: false,
	});

	return Question;
};

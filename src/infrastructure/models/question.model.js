module.exports = (sequelize, DataTypes, Model) => {
    class Question extends Model { }
    Question.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        questionText: {
            type: DataTypes.STRING(255),
            field: 'question_text',
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
        rightAnswer: {
            type: DataTypes.ARRAY(DataTypes.STRING(255)),
            field: 'right_answer',
            allowNull: true,
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
}

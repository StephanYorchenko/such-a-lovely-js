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
        tableName: 'user_answers',
        sequelize,
        modelName: 'UserAnswer',

        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false,
    })

    return UserAnswer;
}
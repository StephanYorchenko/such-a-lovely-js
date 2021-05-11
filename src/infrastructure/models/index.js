const config = require('../config/db.config.js');
const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
    host: config.HOST,
    port: config.PORT,
    dialect: config.dialect,
    logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model.js')(sequelize, Sequelize.DataTypes, Model);
db.UserAnswer = require('./useranswer.model.js')(sequelize, Sequelize.DataTypes, Model);
db.Question = require('./question.model.js')(sequelize, Sequelize.DataTypes, Model);

db.User.hasMany(db.Question, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    sourceKey: 'id',
    foreignKey: {
        name: 'user',
        allowNull: true,
    },
});

db.User.belongsToMany(db.Question, {
    through: db.UserAnswer,
    sourceKey: 'id',
    targetKey: 'id',
    foreignKey: 'user_id',
});

db.Question.belongsToMany(db.User, {
    through: db.UserAnswer,
    sourceKey: 'id',
    targetKey: 'id',
    foreignKey: {
        name: 'question_id'
    }
});

async function sync() {
    await db.sequelize.sync({ force: true });
}
sync();

module.exports = db;

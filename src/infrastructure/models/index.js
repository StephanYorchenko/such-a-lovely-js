const config = require('../config/db.config.js');
const { Sequelize, Model, QueryTypes } = require('sequelize'); //eslint-disable-line no-unused-vars

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	port: config.PORT,
	dialect: config.dialect,
	logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.QueryType = QueryTypes;

db.User = require('./user.model')(sequelize, Sequelize.DataTypes, Model);
db.UserAnswer = require('./useranswer.model')(sequelize, Sequelize.DataTypes, Model);
db.Question = require('./question.model')(sequelize, Sequelize.DataTypes, Model);
db.UserRefreshToken = require('./userRefreshToken.model')(sequelize, Sequelize.DataTypes, Model);

db.User.hasMany(db.Question, {
	onDelete: 'SET NULL',
	onUpdate: 'CASCADE',
	sourceKey: 'id',
	foreignKey: {
		name: 'user',
		allowNull: true,
	},
});

db.UserAnswer.belongsTo(db.Question, {
	foreignKey: {
		name: 'question_id',
		allowNull: false,
		unique: 'unique_ans',
	}
});
db.Question.hasMany(db.UserAnswer, {
	as: { single: 'Answer', plural: 'Answers' },
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
	foreignKey: {
		name: 'question_id',
		allowNull: false,
		unique: 'unique_ans',
	},
});

db.UserAnswer.belongsTo(db.User, {
	foreignKey: {
		name: 'user_id',
		allowNull: false,
		unique: 'unique_ans',
	},
});
db.User.hasMany(db.UserAnswer, {
	as: { single: 'Answer', plural: 'Answers' },
	onDelete: 'CASCADE',
	onUpdata: 'CASCADE',
	foreignKey: {
		name: 'user_id',
		allowNull: false,
		unique: 'unique_ans',
	}
});

db.UserRefreshToken.hasOne(db.User, {
	as: { single: 'User', plural: 'Users' },
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
	foreignKey: {
		name: 'user_id',
		allowNull: false,
	}
})

async function sync() {
	await db.sequelize.sync();
}
sync();

module.exports = db;

const config = require('../config/db.config.js');
const { Sequelize, Model, DataTypes } = require('sequelize'); //eslint-disable-line no-unused-vars

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
	as: { single: 'UserAnswer', plural: 'UserAnswers' },
});
db.Question.belongsToMany(db.User, {
	through: db.UserAnswer,
	as: { single: 'AnsweredUser', plural: 'AnsweredUsers' },
})

db.UserAnswer.belongsTo(db.Question);
db.Question.hasMany(db.UserAnswer);

db.UserAnswer.belongsTo(db.User);
db.User.hasMany(db.UserAnswer);


async function sync() {
	await db.sequelize.sync();

	const user = await db.User.create({
		email: 'asd@mail.ru',
		password: 'strong password',
	});
	console.log(user.toJSON());

	const question = await user.createQuestion({
		questionTitle: 'Любите ли вы Артемия Рогова?',
		questionDescription: 'Щепитильный вопрос',
		questionType: 'SINGLE_CHOICE',
		options: ['Yes', 'No'],
	});
	console.log(await user.countQuestions());
	console.log(question.toJSON());

	const ans = await db.UserAnswer.create({
		answerText: 'Yes',
		UserId: user.id,
		QuestionId: question.id,
	});

	console.log(ans.toJSON());
}
sync();

module.exports = db;

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
	as: { single: 'VotedQuestion', plural: 'VotedQuestions' },
	foreignKey: {
		name: 'user_id',
		allowNull: false,
	},
});
db.Question.belongsToMany(db.User, {
	through: db.UserAnswer,
	as: { single: 'AnsweredUser', plural: 'AnsweredUsers' },
	foreignKey: {
		name: 'question_id',
		allowNull: false,
	},
});

db.UserAnswer.belongsTo(db.Question);
db.Question.hasMany(db.UserAnswer, {
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
	foreignKey: {
		name: 'question_id',
		allowNull: false,
	},
});

db.UserAnswer.belongsTo(db.User);
db.User.hasMany(db.UserAnswer, {
	onDelete: 'CASCADE',
	onUpdata: 'CASCADE',
	foreignKey: {
		name: 'user_id',
		allowNull: false,
	}
});


async function sync() {
	await db.sequelize.sync({ force: true });

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

	let ans = await db.UserAnswer.create({
		answerText: 'Yes',
		userId: user.id,
		questionId: question.id,
	});
	ans = await db.UserAnswer.create({
		answerText: 'No',
		userId: user.id,
		questionId: question.id,
	});
	ans = await db.UserAnswer.create({
		answerText: 'Maybe',
		userId: user.id,
		questionId: question.id,
	});

	// console.log(await db.UserAnswer.findAll());
	const answersCount = await db.sequelize.query(
		'SELECT answer_text, COUNT(*) as answer_count FROM user_answers WHERE question_id = :questionId GROUP BY answer_text;',
		{
			type: db.QueryType.SELECT,
			replacements: { questionId: question.id },
		}
	);
	console.log(answersCount);

	console.log(await user.getVotedQuestions())
}
sync();

module.exports = db;

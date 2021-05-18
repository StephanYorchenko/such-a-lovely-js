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

db.UserAnswer.belongsTo(db.Question, {
	foreignKey: {
		name: 'question_id',
		allowNull: false,
	}
});
db.Question.hasMany(db.UserAnswer, {
	as: { single: 'Answer', plural: 'Answers' },
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE',
	foreignKey: {
		name: 'question_id',
		allowNull: false,
	},
});

db.UserAnswer.belongsTo(db.User, {
	foreignKey: {
		name: 'user_id',
		allowNull: false,
	},
});
db.User.hasMany(db.UserAnswer, {
	as: { single: 'Answer', plural: 'Answers' },
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
		name: 'asdasd',
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
		user_id: user.id,
		question_id: question.id,
	});
	ans = await db.UserAnswer.create({
		answerText: 'No',
		user_id: user.id,
		question_id: question.id,
	});
	ans = await db.UserAnswer.create({
		answerText: 'Maybe',
		user_id: user.id,
		question_id: question.id,
	});

	const answersCount = await db.sequelize.query(
		'SELECT answer_text, COUNT(*) as answer_count FROM user_answers WHERE question_id = :questionId GROUP BY answer_text;',
		{
			type: db.QueryType.SELECT,
			replacements: { questionId: question.id },
		}
	);
	// console.log(answersCount);
	// console.log(await user.getAnswers());
	const query = [
		'WITH needed_ids(question_id) AS (',
		'SELECT DISTINCT question_id FROM user_answers',
		'WHERE user_id = :userId',
		')',
		'SELECT * FROM needed_ids JOIN questions',
		'ON question_id = questions.id;'
	].join(' ');

	const questions = await db.sequelize.query(query, {
		type: db.QueryType.SELECT,
		replacements: {
			userId: user.id,
		},
	});

	console.log(questions);
}
sync();

module.exports = db;

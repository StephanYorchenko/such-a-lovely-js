const userStorage = require('../userStorage');
const surveyRepository = require('./surveysRepository');
const db = require('../models'); //eslint-disable-line no-unused-vars

class UserRepository {
	constructor(userStorage) {
		this.userStorage = userStorage;
	}

	async checkUserExistByID(userID) {
		const tryUser = await db.User.findByPk(userID);

		return tryUser !== null;
	}

	async getUserByName(username) {
		const user = await db.User.findOne({
			where: {
				name: username,
			},
		});

		return user;
	}

	async getUserById(userID) {
		const user = await db.User.findByPk(userID);

		return user;
	}

	async addSurveyToUser(userID, survey) {
		const user = await this.getUserById(userID);
		if (user !== null && survey !== null) {
			user.addQuestion(survey);
			return true;
		}

		return false;
	}

	async addCreatedSurveyToUserById(userID, surveyID){
		const survey = await surveyRepository.getSurveyById(surveyID);

		return await this.addSurveyToUser(userID, survey);
	}

	async addAnswersToQuestion(user, question, answers) {
		const neededAnswers = answers.filter(text => question.options.includes(text));
		const answerRecords = neededAnswers.map(text => {
			return {
				user_id: user.id,
				question_id: question.id,
				answerText: text,
			};
		});

		await db.UserAnswer.bulkCreate(answerRecords);
	}

	async hasUserAnswered(userId, questionId) {
		const ans = await db.UserAnswer.findOne({
			where: {
				user_id: userId,
				question_id: questionId,
			}
		});

		return ans !== null;
	}

	createUser(userName){
		if (this.checkUserExistByID(userName))
			return false;
		const user = new User({ name: userName });
		this.userStorage.push(user);
		return user.name;
	}
}


module.exports = new UserRepository(userStorage);
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

	async addAnswerToQuestion(user, question, answerText) {
		await db.UserAnswer.create({
			userId: user.id,
			questionId: question.id,
			answerText: answerText,
		});
	}
}


module.exports = new UserRepository(userStorage);
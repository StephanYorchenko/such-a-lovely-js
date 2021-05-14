const userStorage = require('../userStorage');
const surveyRepository = require('./surveysRepository');
const db = require('../models'); //eslint-disable-line no-unused-vars

class UserRepository {
	constructor(userStorage) {
		this.userStorage = userStorage;
	}

	checkUserExistByID(userID) {
		for (const user of this.userStorage)
			if (user.name === userID)
				return true;
		return false;
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
}


module.exports = new UserRepository(userStorage);
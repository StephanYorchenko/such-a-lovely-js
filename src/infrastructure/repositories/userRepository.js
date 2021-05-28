const surveyRepository = require('./surveysRepository');
const db = require('../models');

class UserRepository {
	async checkUserExistByID(userID) {
		const tryUser = await db.User.findByPk(userID);

		return tryUser !== null;
	}

	async getUserByName(username) {
		return await db.User.findOne({
			where: {
				name: username,
			},
		});
	}

	async getUserById(userID) {
		return await db.User.findByPk(userID);
	}

	async addSurveyToUser(userID, survey) {
		const user = await this.getUserById(userID);
		if (user !== null && survey !== null) {
			await user.addQuestion(survey);
			return true;
		}

		return false;
	}

	async addCreatedSurveyToUserById(userID, surveyID) {
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

	async createUser(userName) {
		if (await this.getUserByName(userName) !== null) {
			return false;
		}
		
		const user = await db.User.create({
			name: userName,
			password: 'i love js',
		});

		return user.id;
	}
}


module.exports = new UserRepository();
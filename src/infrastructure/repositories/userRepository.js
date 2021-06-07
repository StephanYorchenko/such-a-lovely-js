const surveyRepository = require('./surveysRepository');
const db = require('../models');
const md5 = require('md5');

class UserRepository {
	async checkUserExistByID(userID) {
		const tryUser = await db.User.findByPk(userID);

		return tryUser !== null;
	}

	async usernameInUse(username) {
		const user = await this.getUserByName(username);
		
		return user !== null;
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

	async createUser(username, password) {
		if (await this.getUserByName(username) !== null) {
			return false;
		}
		
		const salt = process.env['SECRET_SALT'] || 'bad salt';
		const saltedPassword = password + salt;

		const user = await db.User.create({
			name: username,
			password: md5(saltedPassword),
		});

		return user.id;
	}
}


module.exports = new UserRepository();
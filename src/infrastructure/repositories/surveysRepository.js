const { surveysStorage, Survey } = require('../surveyStorage');
const db = require('../models')

class SurveysRepository {
	constructor(surveysStorage) {
		this.surveysStorage = surveysStorage;
	}

	async getCreatedByUser(user) {
		const questions = await user.getQuestions();

		return questions;
	}

	async getSurveyById(surveyId) {
		return await db.Question.findByPk(surveyId)
	}

	async getAllVotedSurveysByUser(user) {
		return await db.User.getVotedQuestions();
	}

	_getDateTime() {
		const today = new Date();
		const dd = String(today.getDate()).padStart(2, '0');
		const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		const yyyy = today.getFullYear();

		return dd + '-' + mm + '-' + yyyy;
	}

	async createSurvey(surveyData) {
		const question = await db.Question.create({
			options: surveyData.answers,
			questionTitle: surveyData.title,
			questionDescription: surveyData.description,
			closed: surveyData.end || false,
			bgColor: surveyData.bgColor,
			textColor: surveyData.textColor,
			config: surveyData.config,
		});

		return question;
	}

	async getSurveyResults(surveyID) {
		const answersCount = await db.sequelize.query(
			'SELECT answer_text, COUNT(*) FROM user_answers WHERE question_id = :questionId GROUP BY answer_text;',
			{
				type: db.QueryType.SELECT,
				replacements: { questionId: surveyID },
			}
		)
		
		const result = {}
		for (const elem of answersCount) {
			result[elem.answerText] = Number(elem.answerCount) || 0;
		}

		return result;
	}
}


module.exports = new SurveysRepository(surveysStorage);
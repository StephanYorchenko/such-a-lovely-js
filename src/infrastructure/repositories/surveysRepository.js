const { surveysStorage } = require('../surveyStorage');
const db = require('../models');

class SurveysRepository {
	constructor(surveysStorage) {
		this.surveysStorage = surveysStorage;
	}

	async getCreatedByUser(user) {
		const questions = await user.getQuestions();

		return questions;
	}

	async getSurveyById(surveyId) {
		const question = await db.Question.findByPk(surveyId);
		
		return question;
	}

	async getAllVotedSurveysByUser(userId) {
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
				userId: userId,
			},
			model: db.Question,
			mapToModel: true,
		});

		return questions;
	}

	async createSurvey(surveyData) {
		console.log(surveyData);
		const questionType = surveyData.config == 'radio' ? 'SINGLE_CHOICE' : 'MULTI_CHOICE';
		const question = await db.Question.create({
			questionType: questionType,
			options: surveyData.answers,
			title: surveyData.title,
			description: surveyData.description,
			closed: surveyData.end || false,
			bgColor: surveyData.bgColor,
			textColor: surveyData.textColor,
			config: surveyData.config,
		});

		return question;
	}

	async getSurveyResults(surveyID) {
		const answersCount = await db.sequelize.query(
			'SELECT answer_text, COUNT(*) as answer_count FROM user_answers WHERE question_id = :questionId GROUP BY answer_text;',
			{
				type: db.QueryType.SELECT,
				replacements: { questionId: surveyID },
			}
		);
		const survey = await this.getSurveyById(surveyID);

		const result = {};
		for (const elem of answersCount) {
			if (!survey.options.includes(elem.answer_text)) {
				continue;
			}

			result[elem.answer_text] = Number(elem.answer_count) || 0;
		}

		for (const option of survey.options) {
			if (!Object.prototype.hasOwnProperty.call(result, option)) {
				result[option] = 0;
			}
		}

		return result;
	}
}


module.exports = new SurveysRepository(surveysStorage);
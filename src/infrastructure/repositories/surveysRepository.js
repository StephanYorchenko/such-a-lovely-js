const db = require('../models');

class SurveysRepository {
	async getCreatedByUser(user) {
		return await user.getQuestions();
	}

	async getSurveyById(surveyId) {
		return await db.Question.findByPk(surveyId);
	}

	async closeSurvey(surveyId){
		const survey = await this.getSurveyById(surveyId);
		if (survey !== null){
			survey.closed = true;
			await survey.save();
			return true;
		}
		return false;
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

		return await db.sequelize.query(query, {
			type: db.QueryType.SELECT,
			replacements: {
				userId: userId,
			},
			model: db.Question,
			mapToModel: true,
		});
	}

	async createSurvey(surveyData) {
		const questionType = surveyData.config === 'radio' ? 'SINGLE_CHOICE' : 'MULTI_CHOICE';
		return await db.Question.create({
			questionType: questionType,
			options: surveyData.answers,
			title: surveyData.title,
			description: surveyData.description,
			closed: surveyData.end || false,
			bgColor: surveyData.bgColor,
			textColor: surveyData.textColor,
			config: surveyData.config,
		});
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

module.exports = new SurveysRepository();
const { surveysStorage, Survey } = require('../surveyStorage');
const db = require('../models')

class SurveysRepository {
	constructor(surveysStorage) {
		this.surveysStorage = surveysStorage;
	}

	getCreatedByUser(user) {
		const result = [];
		for (const survey of this.surveysStorage)
			if (user.created.includes(survey.id))
				result.push(survey);
		return result;
	}

	async getSurveyById(surveyId) {
		return await db.Question.findByPk(surveyId)
	}

	getAllVotedSurveysByUser(user) {
		// return user.
		const result = [];
		for (const survey of this.surveysStorage)
			if (user.voted.includes(survey.id))
				result.push(survey);
		return result;
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
		db.UserAnswer.findAll({
			attributes: [
				'answer_text',
				[]
			],
		})
	}
}


module.exports = new SurveysRepository(surveysStorage);
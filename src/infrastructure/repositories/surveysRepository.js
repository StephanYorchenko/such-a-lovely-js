const surveysStorage = require('../surveyStorage');

class SurveysRepository {
	constructor (surveysStorage){
		this.surveysStorage = surveysStorage;
	}

	getCreatedByUser(user){
		const result = [];
		for (const survey of this.surveysStorage)
			if (user.created.includes(survey.id))
				result.push(survey);
		return result;
	}

	getSurveyById(surveyId){
		for (const survey of this.surveysStorage)
			if (survey.id === surveyId)
				return survey;
	}

	getAllVotedSurveysByUser(user){
		const result = [];
		for (const survey of this.surveysStorage)
			if (user.voted.includes(survey.id))
				result.push(survey);
		return result;
	}
}


module.exports = new SurveysRepository(surveysStorage);
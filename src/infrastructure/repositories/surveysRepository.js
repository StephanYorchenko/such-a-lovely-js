const {surveysStorage, Survey} = require('../surveyStorage');

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

	_uuidv4() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	_getDateTime(){
		const today = new Date();
		const dd = String(today.getDate()).padStart(2, '0');
		const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		const yyyy = today.getFullYear();

		return dd + '-' + mm + '-' + yyyy;
	}

	createSurvey(surveyData){
		surveyData.id = this._uuidv4();
		surveyData.createdAt = this._getDateTime();
		surveyData.results = {};
		for (const answer of surveyData.answers){
			surveyData.results[answer] = 0;
		}
		surveyData.end = false;
		const survey = new Survey(surveyData);
		this.surveysStorage.push(survey);
		return surveyData.id;
	}
}


module.exports = new SurveysRepository(surveysStorage);
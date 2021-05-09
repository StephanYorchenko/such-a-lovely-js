const baseSurveysRepository = require('../../core/baseRepositories/baseSurveysRepository');
const surveysStorage = require('../surveyStorage');

const SurveysRepository =
class extends baseSurveysRepository{
	getAllSurveysByUserID(userID){
		return this.surveysStorage.getCreatedByUser(userID);
	}

	getSurveyByID(surveyId){
		return this.surveysStorage.getSurveyById(surveyId);
	}

	getAllVotedSurveysByUserID(userID){
		return this.surveysStorage.getVotedByUser(userID);
	}
};


module.exports = new SurveysRepository(surveysStorage);
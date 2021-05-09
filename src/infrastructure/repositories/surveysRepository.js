const baseSurveysRepository = require('../../core/baseRepositories/baseSurveysRepository');
const surveysStorage = require('../surveyStorage');

const SurveysRepository =
class extends baseSurveysRepository{
	getAllSurveysByUserID(userID){
		return this.surveysStorage.getCreatedByUser(userID);
	}
};


module.exports = new SurveysRepository(surveysStorage);
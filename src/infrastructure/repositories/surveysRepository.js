const baseSurveysRepository = require('../../core/baseRepositories/baseSurveysRepository');
const userStorage = require('../userStorage');

const SurveysRepository =
class extends baseSurveysRepository{
	getAllSurveysByUserID(userID){
		return this.userStorage.data[userID];
	}
};


module.exports = new SurveysRepository(userStorage);
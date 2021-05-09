const baseSurveysRepository = require('../../core/baseRepositories/baseSurveysRepository');

const SurveysRepository =
class extends baseSurveysRepository{
	getAllSurveysByUserID(userID){
		return this.userStorage[userID];
	}
};

const userStorage = {
	'asdasd': [
		{description: 'Какой-то опрос про тервер'},
		{description: 'Другой опрос про то насколько сильно все любят js'}
	],
	'lololozhkin': [
		{description: 'Кто больше любит жс?'},
	],
};
module.exports = new SurveysRepository(userStorage);
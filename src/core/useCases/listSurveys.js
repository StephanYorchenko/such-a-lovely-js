const BaseUseCase = require('./baseUseCase');
const SurveysRepository = require('../../infrastructure/repositories/surveysRepository');

const ListSurveysUseCase =
class extends BaseUseCase{
	static execute(params, request){ //eslint-disable-line no-unused-vars
		return SurveysRepository.getAllSurveysByUserID(request.session.user);
	}
};

module.exports = ListSurveysUseCase;
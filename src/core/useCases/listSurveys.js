const BaseUseCase = require('./baseUseCase');
const SurveysRepository = require('../../infrastructure/repositories/surveysRepository');

const ListSurveysUseCase =
class extends BaseUseCase{
	static execute(_, request){
		return SurveysRepository.getAllSurveysByUserID(request.session.user);
	}
};

module.exports = ListSurveysUseCase;
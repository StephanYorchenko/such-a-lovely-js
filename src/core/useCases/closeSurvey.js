const BaseUseCase = require('./baseUseCase');
const SurveysRepository = require('../../infrastructure/repositories/surveysRepository');

class CloseSurveyUseCase extends BaseUseCase{
	static execute(params){
		const surveyData = SurveysRepository.getSurveyById(params.id);
		surveyData.end = true;
		return {success: true};
	}
}

module.exports = CloseSurveyUseCase;
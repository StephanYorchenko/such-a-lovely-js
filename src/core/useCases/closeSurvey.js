const BaseUseCase = require('./baseUseCase');
const SurveysRepository = require('../../infrastructure/repositories/surveysRepository');

class CloseSurveyUseCase extends BaseUseCase {
	static async execute(params) {
		const surveyData = await SurveysRepository.getSurveyById(params.id);
		if (surveyData !== null) {
			surveyData.closed = true;
			await surveyData.save();
			return { success: true };
		}
		
		return { success: false, error: 'not able to find survey with given id' };
	}
}

module.exports = CloseSurveyUseCase;
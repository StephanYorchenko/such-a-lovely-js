const BaseUseCase = require('./baseUseCase');
const SurveysRepository = require('../../infrastructure/repositories/surveysRepository');

class CloseSurveyUseCase extends BaseUseCase {
	static async execute(params) {
		const result = { success: await SurveysRepository.closeSurvey(params.id) };
		if (!result.success)
			result.error = 'not able to find survey with given id';
		return result;
	}
}

module.exports = CloseSurveyUseCase;
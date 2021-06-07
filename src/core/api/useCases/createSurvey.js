const BaseUseCase = require('../../baseUseCase');
const SurveysRepository = require('../../../infrastructure/repositories/surveysRepository');
const UserRepository = require('../../../infrastructure/repositories/userRepository');


class CreateSurveyUseCase extends BaseUseCase {
	async execute(params, request) {
		const survey = await SurveysRepository.createSurvey(params);
		const result = await UserRepository.addSurveyToUser(request.user.id, survey);
		
		return { success: result };
	}
}

module.exports = CreateSurveyUseCase;
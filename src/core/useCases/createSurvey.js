const BaseUseCase = require('./baseUseCase');
const SurveysRepository = require('../../infrastructure/repositories/surveysRepository');
const UserRepository = require('../../infrastructure/repositories/userRepository');


class CreateSurveyUseCase extends BaseUseCase {
	static async execute(params, request) {
		const survey = await SurveysRepository.createSurvey(params);
		const result = UserRepository.addSurveyToUser(request.session.user, survey);
		
		return { success: result };
	}
}

module.exports = CreateSurveyUseCase;
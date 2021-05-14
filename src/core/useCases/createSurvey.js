const BaseUseCase = require('./baseUseCase');
const SurveysRepository = require('../../infrastructure/repositories/surveysRepository');
const UserRepository = require('../../infrastructure/repositories/userRepository');


class CreateSurveyUseCase extends BaseUseCase {
	static execute(params, request) {
		const surveyID = SurveysRepository.createSurvey(params);
		const result = UserRepository.addCreatedSurveyToUser(request.session.user, surveyID);
		return { success: result };
	}
}

module.exports = CreateSurveyUseCase;
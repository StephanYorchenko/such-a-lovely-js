const BaseUseCase = require('../../baseUseCase');
const UserRepository = require('../../../infrastructure/repositories/userRepository');
const SurveysRepository = require('../../../infrastructure/repositories/surveysRepository');

class ReplySurveyUseCase extends BaseUseCase {
	async execute(params, req) {
		try {
			const user = await UserRepository.getUserById(req.user.id);
			const survey = await SurveysRepository.getSurveyById(params.surveyID);

			await UserRepository.addAnswersToQuestion(user, survey, params.response);

			return { success: true };
			
		} catch (error) {
			return { success: false, errors: error };
		}
	}
}

module.exports = ReplySurveyUseCase;
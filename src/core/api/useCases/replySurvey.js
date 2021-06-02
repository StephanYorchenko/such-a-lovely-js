const BaseUseCase = require('../../baseUseCase');
const UserRepository = require('../../../infrastructure/repositories/userRepository');
const SurveysRepository = require('../../../infrastructure/repositories/surveysRepository');

class ReplySurveyUseCase extends BaseUseCase {
	static async execute(params, req) {
		try {
			const user = await UserRepository.getUserById(req.session.user);
			const survey = await SurveysRepository.getSurveyById(params.surveyID);

			await UserRepository.addAnswersToQuestion(user, survey, params.response);

			return { success: true };
			
		} catch (error) {
			console.log(error);
			return { success: false, errors: error };
		}
	}
}

module.exports = ReplySurveyUseCase;
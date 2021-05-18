const BaseUseCase = require('./baseUseCase');
const UserRepository = require('../../infrastructure/repositories/userRepository');
const SurveysRepository = require('../../infrastructure/repositories/surveysRepository');

class ReplySurveyUseCase extends BaseUseCase {
	static async execute(params, req) {
		try {
			const user = await UserRepository.getUserById(req.session.user);
			const survey = await SurveysRepository.getSurveyById(params.surveyID);

			await user.addQuestion(survey);

			for (const answer of params.response) {
				UserRepository.addAnswerToQuestion(user, survey, answer);
			}
			return { success: true };
			
		} catch (error) {
			return { success: false, errors: error }
		}
	}
}

module.exports = ReplySurveyUseCase;
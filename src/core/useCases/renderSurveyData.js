const BaseUseCase = require('./baseUseCase');
const SurveysRepository = require('../../infrastructure/repositories/surveysRepository');
const UserRepository = require('../../infrastructure/repositories/userRepository');

class RenderSurveyDataUseCase extends BaseUseCase {
	static async execute(params, req) {
		const user = await UserRepository.getUserById(req.session.user);
		const survey = await SurveysRepository.getSurveyById(params.id);

		if (survey === null || user === null) {
			return null;
		}

		return {
			data: survey.get_dto_for_front(),
			isAuthor: user.hasQuestion(survey),
			hasVoted: await UserRepository.hasUserAnswered(user.id, survey.id),
			wasEnd: survey.closed
		};
	}
}

module.exports = RenderSurveyDataUseCase;
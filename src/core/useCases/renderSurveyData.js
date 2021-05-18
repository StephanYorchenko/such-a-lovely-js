const BaseUseCase = require('./baseUseCase');
const SurveysRepository = require('../../infrastructure/repositories/surveysRepository');
const UserRepository = require('../../infrastructure/repositories/userRepository');

class RenderSurveyDataUseCase extends BaseUseCase {
	static async execute(params, req) {
		const user = await UserRepository.getUserById(req.session.user);
		const survey = await SurveysRepository.getSurveyById(params.id);
		return {
			data: survey,
			isAuthor: user.hasQuestion(survey),
			hasVoted: await user.hasVotedQuestion(survey),
			wasEnd: survey.closed
		};
	}
}

module.exports = RenderSurveyDataUseCase;
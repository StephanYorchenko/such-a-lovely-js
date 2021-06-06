const BaseUseCase = require('../../baseUseCase');
const SurveysRepository = require('../../../infrastructure/repositories/surveysRepository');
const UserRepository = require('../../../infrastructure/repositories/userRepository');

class RenderSurveyDataUseCase extends BaseUseCase {
	async execute(params, req) {
		const user = await UserRepository.getUserById(req.user.id);
		const survey = await SurveysRepository.getSurveyById(params.id);

		if (survey === null || user === null) {
			return null;
		}

		const data = survey.getDtoForFront();
		data.results = await SurveysRepository.getSurveyResults(params.id);

		return {
			data,
			isAuthor: await user.hasQuestion(survey),
			hasVoted: await UserRepository.hasUserAnswered(user.id, survey.id),
			wasEnd: survey.closed,
		};
	}
}

module.exports = RenderSurveyDataUseCase;
const BaseUseCase = require('../../baseUseCase');
const SurveysRepository = require('../../../infrastructure/repositories/surveysRepository');


class ListVotedSurveysUseCase extends BaseUseCase {
	static async execute(_, request) {
		const questions = await SurveysRepository.getAllVotedSurveysByUser(request.session.user);
		return questions.map(survey => survey.getDtoForFront());
	}
}

module.exports = ListVotedSurveysUseCase;
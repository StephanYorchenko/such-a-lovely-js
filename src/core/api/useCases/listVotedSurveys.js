const BaseUseCase = require('../../baseUseCase');
const SurveysRepository = require('../../../infrastructure/repositories/surveysRepository');


class ListVotedSurveysUseCase extends BaseUseCase {
	async execute(_, request) {
		const questions = await SurveysRepository.getAllVotedSurveysByUser(request.user.id);
		return questions.map(survey => survey.getDtoForFront());
	}
}

module.exports = ListVotedSurveysUseCase;
const BaseUseCase = require('./baseUseCase');
const SurveysRepository = require('../../infrastructure/repositories/surveysRepository');


class ListVotedSurveysUseCase extends BaseUseCase {
	static async execute(_, request) {
		return await SurveysRepository.getAllVotedSurveysByUser(request.session.user);
	}
}

module.exports = ListVotedSurveysUseCase;
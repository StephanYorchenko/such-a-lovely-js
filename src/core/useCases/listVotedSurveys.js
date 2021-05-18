const BaseUseCase = require('./baseUseCase');
const SurveysRepository = require('../../infrastructure/repositories/surveysRepository');
const UserRepository = require('../../infrastructure/repositories/userRepository');


class ListVotedSurveysUseCase extends BaseUseCase {
	static async execute(_, request) {
		return await SurveysRepository.getAllVotedSurveysByUser(request.session.user);
	}
}

module.exports = ListVotedSurveysUseCase;
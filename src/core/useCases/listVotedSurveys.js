const BaseUseCase = require('./baseUseCase');
const SurveysRepository = require('../../infrastructure/repositories/surveysRepository');
const UserRepository = require('../../infrastructure/repositories/userRepository');


class ListVotedSurveysUseCase extends BaseUseCase {
	static async execute(_, request) {
		const user = await UserRepository.getUserById(request.session.user);
		return await SurveysRepository.getAllVotedSurveysByUser(user);
	}
}

module.exports = ListVotedSurveysUseCase;
const BaseUseCase = require('../../baseUseCase');
const SurveysRepository = require('../../../infrastructure/repositories/surveysRepository');
const UserRepository = require('../../../infrastructure/repositories/userRepository');

class ListSurveysUseCase extends BaseUseCase {
	static async execute(_, request) {
		const user = await UserRepository.getUserById(request.session.user);
		const questions = await SurveysRepository.getCreatedByUser(user);

		return questions.map(survey => survey.getDtoForFront());
	}
}

module.exports = ListSurveysUseCase;
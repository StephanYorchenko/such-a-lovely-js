const BaseUseCase = require('./baseUseCase');
const SurveysRepository = require('../../infrastructure/repositories/surveysRepository');
const UserRepository = require('../../infrastructure/repositories/userRepository');


class ListVotedSurveysUseCase extends BaseUseCase{
	static execute(_, request){
		const user = UserRepository.getUserById(request.session.user);
		return SurveysRepository.getAllVotedSurveysByUser(user);
	}
}

module.exports = ListVotedSurveysUseCase;
const BaseUseCase = require('./baseUseCase');
const SurveysRepository = require('../../infrastructure/repositories/surveysRepository');
const UserRepository = require('../../infrastructure/repositories/userRepository');

const ListVotedSurveysUseCase =
class extends BaseUseCase{
	static execute(_, request){
		const user = UserRepository.getUserById(request.session.user);
		return SurveysRepository.getAllVotedSurveysByUserID(user);
	}
};

module.exports = ListVotedSurveysUseCase;
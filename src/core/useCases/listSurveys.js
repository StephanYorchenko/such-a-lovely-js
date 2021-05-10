const BaseUseCase = require('./baseUseCase');
const SurveysRepository = require('../../infrastructure/repositories/surveysRepository');
const UserRepository = require('../../infrastructure/repositories/userRepository');

class ListSurveysUseCase extends BaseUseCase{
	static execute(_, request){
		const user = UserRepository.getUserById(request.session.user);
		return SurveysRepository.getCreatedByUser(user);
	}
}

module.exports = ListSurveysUseCase;
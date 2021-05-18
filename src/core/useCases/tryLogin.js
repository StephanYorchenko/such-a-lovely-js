const BaseUseCase = require('./baseUseCase');
const UserRepository = require('../../infrastructure/repositories/userRepository');


class TryLoginUseCase extends BaseUseCase {
	static async execute(params, req) {
		const success = await UserRepository.checkUserExistByID(params.userid);
		if (success) {
			req.session.isLogin = true;
			req.session.user = params.userid;
		}
		
		return { success: success, target: req.session.targetPage };
	}
}

module.exports = TryLoginUseCase;
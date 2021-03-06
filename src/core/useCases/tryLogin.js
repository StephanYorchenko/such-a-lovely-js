const BaseUseCase = require('./baseUseCase');
const UserRepository = require('../../infrastructure/repositories/userRepository');


class TryLoginUseCase extends BaseUseCase {
	static async execute(params, req) {
		const user = await UserRepository.getUserByName(params.userid);

		let success = false;
		if (user !== null) {
			req.session.isLogin = true;
			req.session.user = user.id;
			success = true;
		}
		
		return { success: success, target: req.session.targetPage };
	}
}

module.exports = TryLoginUseCase;
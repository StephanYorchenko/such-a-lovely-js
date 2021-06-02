const BaseUseCase = require('../../baseUseCase');
const UserRepository = require('../../../infrastructure/repositories/userRepository');


class TryLoginUseCase extends BaseUseCase {
	static async execute(params, req) {
		console.log(params);
		const user = await UserRepository.getUserByName(params.username);

		let success = false;
		if (user !== null && user.password === params.password) {
			req.session.isLogin = true;
			req.session.user = user.id;
			success = true;
		}
		
		return { success: success, target: req.session.targetPage };
	}
}

module.exports = TryLoginUseCase;
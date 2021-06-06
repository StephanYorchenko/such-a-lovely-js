const BaseUseCase = require('./baseUseCase');
const UserRepository = require('../../infrastructure/repositories/userRepository');

class GetNameUseCase extends BaseUseCase {
	static async execute(_, request) {
		const user = await UserRepository.getUserById(request.session.user);
		return { name: user.name };
	}
}

module.exports = GetNameUseCase;
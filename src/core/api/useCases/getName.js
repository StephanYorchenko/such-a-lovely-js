const BaseUseCase = require('../../baseUseCase');
const UserRepository = require('../../../infrastructure/repositories/userRepository');

class GetNameUseCase extends BaseUseCase {
	async execute(_, request) {
		const user = await UserRepository.getUserById(request.user.id);
		return { name: user.name };
	}
}

module.exports = GetNameUseCase;
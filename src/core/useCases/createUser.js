const BaseUseCase = require('./baseUseCase');
const UserRepository = require('../../infrastructure/repositories/userRepository');

class CreateUserUseCase extends BaseUseCase{
	static execute(params, request){
		const result = UserRepository.createUser(params.userName);
		request.session.user = result || undefined;
		request.session.isLogin = true;
		return {success: Boolean(result)};
	}
}

module.exports = CreateUserUseCase;
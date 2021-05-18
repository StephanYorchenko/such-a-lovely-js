const BaseUseCase = require('./baseUseCase');
const UserRepository = require('../../infrastructure/repositories/userRepository');

class CreateUserUseCase extends BaseUseCase{
	static execute(params, request){
		const result = UserRepository.createUser(params.userName);
		request.session.user = result || undefined;
		console.log(request.session.user, result);
		request.session.isLogin = true;
		return {success: Boolean(result)};
	}
}

module.exports = CreateUserUseCase;
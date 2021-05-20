const BaseUseCase = require('./baseUseCase');
const UserRepository = require('../../infrastructure/repositories/userRepository');

class CreateUserUseCase extends BaseUseCase{
	static async execute(params, request){
		const result = await UserRepository.createUser(params.userName);
		request.session.user = result || undefined;
		console.log(request.session.user, result);
		request.session.isLogin = true;
		return {success: Boolean(result)};
	}
}

module.exports = CreateUserUseCase;
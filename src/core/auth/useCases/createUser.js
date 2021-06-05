const BaseUseCase = require('../../baseUseCase');
const UserRepository = require('../../../infrastructure/repositories/userRepository');

class CreateUserUseCase extends BaseUseCase {
	async execute(params, request) {
		if (params.username === '') {
			return { success: false, error: 'Пустое имя пользователя' };
		}

		const userid = await UserRepository.createUser(params.username, params.password);
		const result = Boolean(userid);

		request.session.user = userid || undefined;
		request.session.isLogin = result;

		const responseData = { success: result };
		if (!result) {
			responseData.error = 'Данное имя уже занято';
		}

		return responseData;
	}
}

module.exports = CreateUserUseCase;
const BaseUseCase = require('../../baseUseCase');
const UserRepository = require('../../../infrastructure/repositories/userRepository');

class CreateUserUseCase extends BaseUseCase {
	async execute(params, req) {
		if (params.username === '') {
			return { success: false, error: 'Пустое имя пользователя' };
		}

		const userid = await UserRepository.createUser(params.username, params.password);
		const result = Boolean(userid);

		//const responseData = { success: result, target: req.query.next };
		const responseData = { success: result };
		if (!result) {
			responseData.error = 'Данное имя уже занято';
		}

		return responseData;
	}
}

module.exports = CreateUserUseCase;
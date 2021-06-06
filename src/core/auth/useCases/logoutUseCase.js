const BaseUseCase = require('../../baseUseCase');

class LogoutUseCase extends BaseUseCase {
	async execute(params, req) {
		return { success: true, destroyCookie: ['access']};
	}
}

module.exports = LogoutUseCase;
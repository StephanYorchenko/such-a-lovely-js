const BaseUseCase = require('../../baseUseCase');

class LogoutUseCase extends BaseUseCase {
	async execute() {
		return { success: true, destroyCookie: ['access']};
	}
}

module.exports = LogoutUseCase;
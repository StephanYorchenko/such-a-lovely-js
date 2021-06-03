const BaseUseCase = require('../../baseUseCase');

class LogoutUseCase extends BaseUseCase {
	static execute(params, req) {
		req.session.isLogin = false;
		req.session.user = undefined;
		return { success: true, destroyCookie: ['access']};
	}
}

module.exports = LogoutUseCase;
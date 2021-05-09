const BaseUseCase = require('./baseUseCase');


const LogoutUseCase =
class extends BaseUseCase{
	static execute(params, req){
		req.session.isLogin = false;
		req.session.user = undefined;
		return {success: true};
	}
};

module.exports = LogoutUseCase;
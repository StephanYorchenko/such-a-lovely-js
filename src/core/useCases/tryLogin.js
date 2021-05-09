const BaseUseCase = require('./baseUseCase');

const TryLoginUseCase =
class extends BaseUseCase{
	static execute(params, req){
		const success = params.userid === 'asdasd';
		if (success){
			req.session.isLogin = true;
			req.session.user = params.userid;
		}
		return {success: success};
	}
};

module.exports = TryLoginUseCase;
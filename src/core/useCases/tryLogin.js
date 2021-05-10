const BaseUseCase = require('./baseUseCase');
const UserRepository = require('../../infrastructure/repositories/userRepository');


const TryLoginUseCase =
class extends BaseUseCase{
	static execute(params, req){
		const success = UserRepository.checkUserExistByID(params.userid);
		if (success){
			req.session.isLogin = true;
			req.session.user = params.userid;
		}
		return {success: success, target: req.session.targetPage};
	}
};

module.exports = TryLoginUseCase;
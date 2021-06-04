const db = require('../models');

class TokenRepository {
	async getUserByRefreshToken(refreshToken) {
		const tokenModel = await db.UserRefreshToken.findByPk(refreshToken);
		if (tokenModel === null) {
			return null;
		}

		const user = await tokenModel.getUser();
		return user;
	}

	async generateRefreshToken(user) {
		let userModel = null;
		try {
			userModel = await db.User.findByPk(user.id);
		} catch (e) {
			throw 'invalid user object provided';
		}

		if (userModel === null) {
			throw 'user id is not present';
		}

		const curDate = new Date();
		const expiredAt = new Date(curDate.getTime() + 24*60*60*1000);

		const tokenModel = await db.UserRefreshToken.create({
			user_id: userModel.id,
			expiredAt,
		});

		return tokenModel.id;
	}
}

module.exports = new TokenRepository();
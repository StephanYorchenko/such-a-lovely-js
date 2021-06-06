const BaseUseCase = require('../../baseUseCase');
const { tokenRepository } = require('../../../infrastructure/repositories/tokenRepository');
const jwt = require('jsonwebtoken');

class RefreshTokenUseCase extends BaseUseCase {
	constructor(jwtSecret) {
		super();
		this.jwtSecret = jwtSecret;
	}

	async execute(params, req) {
        const refresh = req.cookies['refresh'];
		var user = null;
		try {
        	user = await tokenRepository.getUserByRefreshToken(refresh);
		} catch(err) {
			return { success: false, error: err };
		}

        if (user === null) {
            return { success: false, error: 'refresh token is not present' };
        }

        const newRefresh = await tokenRepository.generateRefreshToken(user);
		const newAccess = jwt.sign({
			id: user.id,
		}, this.jwtSecret, {
			expiresIn: '20m',
		});

		return {
			success: true,
			userData,
			setCookie: [
				{
					key: 'refresh',
					value: refreshToken,
					options: {
						httpOnly: true,
						maxAge: 2*24*60*60*1000,
					},
				},
				{
					key: 'access',
					value: newAccess,
					options: {
						httpOnly: true,
						maxAge: 15*60*1000,
					},
				}
			]
		};
	}
}

module.exports = TryLoginUseCase;
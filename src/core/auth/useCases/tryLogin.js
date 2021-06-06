const BaseUseCase = require('../../baseUseCase');
const { authenticate } = require('../backend');
const jwt = require('jsonwebtoken');

class TryLoginUseCase extends BaseUseCase {
	constructor(jwtSecret) {
		super();
		this.jwtSecret = jwtSecret;
	}

	async execute(params, req) {
		const [resp, err] = await authenticate(params.username, params.password);

		if (err !== null) {
			return {
				success: false,
				error: err,
			};
		}
		const [userData, refreshToken] = resp;
		const accessToken = jwt.sign({
			id: userData.id,
		}, this.jwtSecret || 'secret', {
			expiresIn: '60m',
		});

		return {
			success: true,
			userData,
			target: req.session.targetPage,
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
					value: accessToken,
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
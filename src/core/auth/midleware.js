const jwt = require('jsonwebtoken');
const { User } = require('../../infrastructure/models');
const RefreshTokenUseCase = require('../auth/useCases/refreshToken');
const setCookies = require('../utils');

async function auth(req, res, next) {
	const token = req.cookies['access'];
	const refresh = req.cookies['refresh'];
	if (token === undefined && !refresh) {
		next();
		return;
	}

	const jwtSecret = process.env['JWT_SECRET'];
	try {
		const payload = jwt.verify(token, jwtSecret, { algorithms: ['HS256'] });

		req.user = { id: payload.id };
		next();
		return;

	} catch (err) {
		if (JSON.stringify(err).indexOf('expired') !== -1) {
			const useCase = new RefreshTokenUseCase(jwtSecret);
			const refreshResponse = await useCase.execute({}, req);
			if (refreshResponse.success) {
				setCookies(res, refreshResponse);
				const tokenData = jwt.decode(token);
				req.user = { id: tokenData.id };
				next();
				return;
			}
		}
		req.userErr = `authorization: ${JSON.stringify(err)}`;
		next();
		return;
	}
}

async function auth_needed(req, res, next) {
	if (req.userErr) {
		res.send({ success: false, error: req.userErr });
		return;
	}

	if (!req.user) {
		res.send({ success: false, error: 'authorization is not provided' });
		return;
	}

	const payload = req.user;
	const user = await User.findByPk(payload.id);
	if (user === null) {
		res.send({ success: false, error: 'authorization: user does not exist' });
		return;
	}

	req.user = { id: user.id };
	next();
}

module.exports = { auth_needed, auth };
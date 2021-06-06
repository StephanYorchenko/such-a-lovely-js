const jwt = require('jsonwebtoken');
const { User } = require('../../infrastructure/models');

async function auth(req, res, next) {
	const token = req.cookies['access'];
	if (token === undefined) {
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
		res.send({ success: false, error: err });
		return;
	}
}

async function auth_needed(req, res, next) {
	if (!req.user) {
		res.send({ success: false, error: 'authorization is not provided' });
		return;
	}

	const payload = req.user;
	const user = await User.findByPk(payload.id);
	if (user === null) {
		res.send({ success: false, error: 'user does not exist' });
		return;
	}

	req.user = { id: user.id };
	next();
}

module.exports = { auth_needed, auth };
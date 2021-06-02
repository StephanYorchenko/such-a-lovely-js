const jwt = require('jsonwebtoken');
const { User } = require('../../infrastructure/models');

async function auth(req, res, next) {
    const auth = req.header('Authorization');
    // console.log(auth);

    if (auth === undefined) {
        next();
        return;
    }

    if (!auth.startsWith('Bearer ')) {
        next();
        return;
    }

    const token = auth.slice(7);

    const jwtSecret = process.env['JWT_SECRET'];
    try {
        const payload = jwt.verify(token, jwtSecret, { algorithms: ['HS256'] });

        req.user = payload;
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
    const user = await User.findByPk(payload.userId);
    if (user === null) {
        res.send({ success: false, error: 'user does not exist' });
        return;
    }

    req.user = { userId: user.id };
    next();
}

module.exports = { auth_needed, auth };
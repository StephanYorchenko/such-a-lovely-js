const tokenRepository = require('../../infrastructure/repositories/tokenRepository');
const userRepository = require('../../infrastructure/repositories/userRepository');
const db = require('../../infrastructure/models');

async function authenticate(username, password) {
    const user = await userRepository.getUserByName(username);

    if (user === null) {
        return [null, { error: 'username is not present' }];
    }

    if (!user.validatePassword(password)) {
        return [null, { error: 'invalid password provided' }];
    }

    const refreshToken = await tokenRepository.generateRefreshToken(user);

    return [[user.toJSON(), refreshToken], null];
}

async function register(username, password) {
    if (await userRepository.usernameInUse(username)) {
        return [null, { error: 'username is already in use' }];
    }

    const userId = await userRepository.createUser(username, password);
    const refreshToken = await tokenRepository.generateRefreshToken({ id: userId });

    return [userId, null];
}

module.exports = { register, authenticate }
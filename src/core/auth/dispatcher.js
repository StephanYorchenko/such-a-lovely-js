const { Manager, HandlerFactory } = require('../manager');
const CreateUserUseCase = require('./useCases/createUser');
const LogOutUseCase = require('./useCases/logoutUseCase');
const TryLoginUseCase = require('./useCases/tryLogin');
const log4js = require('log4js');
const RefreshTokenUseCase = require('./useCases/refreshToken');
const logger = log4js.getLogger('manager');


function createDispatcher() {
	const manager = new Manager();
	const handlers = new HandlerFactory();

	manager.addHandler(handlers.createHandler('createUser', new CreateUserUseCase()));
	manager.addHandler(handlers.createHandler('logout', new LogOutUseCase()));
	manager.addHandler(handlers.createHandler('tryLogin', new TryLoginUseCase(process.env['JWT_SECRET'])));
	manager.addHandler(handlers.createHandler('refreshToken', new RefreshTokenUseCase(process.env['JWT_SECRET'])));

	logger.info('auth dispatcher init');

	return manager;
}

module.exports = Object.freeze(createDispatcher());


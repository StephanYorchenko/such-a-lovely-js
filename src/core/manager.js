const log4js = require('log4js');
const logger = log4js.getLogger('manager');

class HandlerFactory {
	createHandler(methodName, useCase) {
		const handler = {};
		handler[methodName] = useCase;
		return handler;
	}
}

class Manager {
	constructor() {
		this.handlers = [];
	}

	addHandler(handler) {
		this.handlers.push(handler);
	}

	async tryExecute(methodName, args, request) {
		logger.info(`Call ${methodName} with ${JSON.stringify(args, null, 2)} as ${request.session.user}`);
		for (const handler of this.handlers) {
			if (Object.getOwnPropertyNames(handler).includes(methodName)) {
				return await handler[methodName].execute(args, request);
			}
		}
	}
}

module.exports = { Manager, HandlerFactory };
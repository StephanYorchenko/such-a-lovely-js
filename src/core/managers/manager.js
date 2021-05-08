class HandlerFactory{
	createHandler(methodName, func){
		const handler = {};
		handler[methodName] = func;
		return handler;
	}
}

class Manager{
	constructor() {
		this.handlers = [];
	}

	addHandler(handler){
		this.handlers.push(handler);
	}

	tryExecute(methodName, args, user){
		console.log(methodName, args);
		for (const handler of this.handlers)
			if (Object.getOwnPropertyNames(handler).includes(methodName))
				return handler[methodName](args, user);
	}
}

const handlers = new HandlerFactory();
const manager = new Manager();

//set handlers to methods
manager.addHandler(handlers.createHandler('listCreatedSurveys', (_, user) => ['aaa', user]));


module.exports = Object.freeze(manager);
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

	tryExecute(methodName, args, request){
		console.log(methodName, args);
		for (const handler of this.handlers)
			if (Object.getOwnPropertyNames(handler).includes(methodName))
				return handler[methodName](args, request);
	}
}

const handlers = new HandlerFactory();
const manager = new Manager();

//set handlers to methods
manager.addHandler(handlers.createHandler('listCreatedSurveys', (_, req) => ['aaa', req.session.user]));
manager.addHandler(handlers.createHandler('tryLogin', (params, req) => {
	const success = params.userid === 'asdasd';
	if (success){
		req.session.isLogin = true;
		req.session.user = params.userid;
	}
	return {success: success};
}));

module.exports = Object.freeze(manager);
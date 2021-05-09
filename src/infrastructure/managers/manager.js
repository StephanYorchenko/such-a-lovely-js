const TryLoginUseCase = require('../../core/useCases/tryLogin');
const ListSurveysUseCase = require('../../core/useCases/listSurveys');
const LogoutUseCase = require('../../core/useCases/logoutUseCase');
const RenderSurveyDataUseCase = require('../../core/useCases/renderSurveyData');
const GetSurveyHistogramDataUseCase = require('../../core/useCases/getSurveyData');

class HandlerFactory{
	createHandler(methodName, useCase){
		const handler = {};
		handler[methodName] = useCase;
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
		for (const handler of this.handlers)
			if (Object.getOwnPropertyNames(handler).includes(methodName))
				return handler[methodName].execute(args, request);
	}
}

const handlers = new HandlerFactory();
const manager = new Manager();

//set handlers to methods
manager.addHandler(handlers.createHandler('listCreatedSurveys', ListSurveysUseCase));
manager.addHandler(handlers.createHandler('tryLogin', TryLoginUseCase));
manager.addHandler(handlers.createHandler('logout', LogoutUseCase));
manager.addHandler(handlers.createHandler('renderSurvey', RenderSurveyDataUseCase));
manager.addHandler(handlers.createHandler('getSurveyHistogramData', GetSurveyHistogramDataUseCase));

module.exports = Object.freeze(manager);
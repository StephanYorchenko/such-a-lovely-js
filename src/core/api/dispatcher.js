const { Manager, HandlerFactory } = require('../manager');
const ListSurveysUseCase = require('./useCases/listSurveys');
const ListVotedSurveysUseCase = require('./useCases/listVotedSurveys');
const RenderSurveyDataUseCase = require('./useCases/renderSurveyData');
const GetSurveyHistogramDataUseCase = require('./useCases/getSurveyData');
const CloseSurveyUseCase = require('./useCases/closeSurvey');
const ReplySurveyUseCase = require('./useCases/replySurvey');
const CreateSurveyUseCase = require('./useCases/createSurvey');
const log4js = require('log4js');
const logger = log4js.getLogger('manager');


function createDispatcher() {
	const manager = new Manager();
	const handlers = new HandlerFactory();

	manager.addHandler(handlers.createHandler('listCreatedSurveys', new ListSurveysUseCase()));
	manager.addHandler(handlers.createHandler('listVotedSurveys', new ListVotedSurveysUseCase()));
	manager.addHandler(handlers.createHandler('renderSurvey', new RenderSurveyDataUseCase()));
	manager.addHandler(handlers.createHandler('getSurveyHistogramData', new GetSurveyHistogramDataUseCase()));
	manager.addHandler(handlers.createHandler('closeSurvey', new CloseSurveyUseCase()));
	manager.addHandler(handlers.createHandler('replySurvey', new ReplySurveyUseCase()));
	manager.addHandler(handlers.createHandler('createSurvey', new CreateSurveyUseCase()));

	logger.info('api dispatcher init');

	return manager;
}

module.exports = Object.freeze(createDispatcher());


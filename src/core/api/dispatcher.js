const { Manager, HandlerFactory } = require('../manager');
const TryLoginUseCase = require('./useCases/tryLogin');
const ListSurveysUseCase = require('./useCases/listSurveys');
const ListVotedSurveysUseCase = require('./useCases/listVotedSurveys');
const LogoutUseCase = require('./useCases/logoutUseCase');
const RenderSurveyDataUseCase = require('./useCases/renderSurveyData');
const GetSurveyHistogramDataUseCase = require('./useCases/getSurveyData');
const CloseSurveyUseCase = require('./useCases/closeSurvey');
const ReplySurveyUseCase = require('./useCases/replySurvey');
const CreateSurveyUseCase = require('./useCases/createSurvey');
const CreateUserUseCase = require('./useCases/createUser');
const log4js = require('log4js');
const logger = log4js.getLogger('manager');


function createDispatcher() {
    const manager = new Manager();
    const handlers = new HandlerFactory();

    manager.addHandler(handlers.createHandler('listCreatedSurveys', ListSurveysUseCase));
    manager.addHandler(handlers.createHandler('listVotedSurveys', ListVotedSurveysUseCase));
    manager.addHandler(handlers.createHandler('tryLogin', TryLoginUseCase));
    manager.addHandler(handlers.createHandler('logout', LogoutUseCase));
    manager.addHandler(handlers.createHandler('renderSurvey', RenderSurveyDataUseCase));
    manager.addHandler(handlers.createHandler('getSurveyHistogramData', GetSurveyHistogramDataUseCase));
    manager.addHandler(handlers.createHandler('closeSurvey', CloseSurveyUseCase));
    manager.addHandler(handlers.createHandler('replySurvey', ReplySurveyUseCase));
    manager.addHandler(handlers.createHandler('createSurvey', CreateSurveyUseCase));
    manager.addHandler(handlers.createHandler('createUser', CreateUserUseCase));

    logger.info('api dispatcher init');

    return manager;
}

module.exports = Object.freeze(createDispatcher());


const BaseUseCase = require('./baseUseCase');
const SurveysRepository = require('../../infrastructure/repositories/surveysRepository');

const CloseSurveyUseCase =
class extends BaseUseCase{
    static execute(params){
        const surveyData = SurveysRepository.getSurveyById(params.id);
        surveyData.end = true;
        return {success: true};
    }
};

module.exports = CloseSurveyUseCase;
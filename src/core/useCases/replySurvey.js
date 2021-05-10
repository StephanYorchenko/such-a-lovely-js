const BaseUseCase = require('./baseUseCase');
const UserRepository = require('../../infrastructure/repositories/userRepository');
const SurveysRepository = require('../../infrastructure/repositories/surveysRepository');

class ReplySurveyUseCase extends BaseUseCase{
    static execute(params, req){
        const user = UserRepository.getUserById(req.session.user);
        user.voted.push(params.surveyID);
        const survey = SurveysRepository.getSurveyById(params.surveyID);
        for (const answer of params.response)
            survey.results[answer]++;
        return {success: true};
    }
}

module.exports = ReplySurveyUseCase;
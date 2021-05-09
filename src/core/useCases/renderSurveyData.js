const BaseUseCase = require('./baseUseCase');
const SurveysRepository = require('../../infrastructure/repositories/surveysRepository');
const UserRepository = require('../../infrastructure/repositories/userRepository');

const RenderSurveyDataUseCase =
class extends BaseUseCase{
	static execute(params, req){
		const user = UserRepository.getUserById(req.session.user);
		const surveyData = SurveysRepository.getSurveyByID(params.id);
		return {
			data: surveyData,
			isAuthor: user.created.includes(params.id),
			hasVoted: user.voted.includes(params.id)
		};
	}
};

module.exports = RenderSurveyDataUseCase;
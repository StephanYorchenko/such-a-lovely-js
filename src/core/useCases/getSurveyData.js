const BaseUseCase = require('./baseUseCase');
const SurveysRepository = require('../../infrastructure/repositories/surveysRepository');

class GetSurveyHistogramDataUseCase extends BaseUseCase{
	static execute(params){
		const surveyData = SurveysRepository.getSurveyById(params.id).results;
		const labels = [];
		const dataset = [];
		for (const [key, value] of Object.entries(surveyData)){
			labels.push(key);
			dataset.push(value);
		}
		return {
			labels: labels,
			dataset: dataset
		};
	}
}

module.exports = GetSurveyHistogramDataUseCase;
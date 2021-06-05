const BaseUseCase = require('../../baseUseCase');
const SurveysRepository = require('../../../infrastructure/repositories/surveysRepository');

class GetSurveyHistogramDataUseCase extends BaseUseCase {
	async execute(params) {
		const results = await SurveysRepository.getSurveyResults(params.id);
		const labels = [];
		const dataset = [];
		for (const [key, value] of Object.entries(results)) {
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
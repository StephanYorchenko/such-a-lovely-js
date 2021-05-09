const BaseUseCase = require('./baseUseCase');

const ListSurveysUseCase =
class extends BaseUseCase{
	static execute(params, request){ //eslint-disable-line no-unused-vars
		return [
			{description: 'Какой-то опрос про тервер'},
			{description: 'Другой опрос про то насколько сильно все любят js'}
		];
	}
};

module.exports = ListSurveysUseCase;
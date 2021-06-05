/* eslint-disable no-unused-vars, no-undef */
const UseCaseClass = require('../api/useCases/closeSurvey');
const useCase = new UseCaseClass();
const { Survey }  = require('../../infrastructure/surveyStorage');
const mockSurvey = new Survey({
	id: '06b91703-c50c-4154-8a26-c1440edc9904',
	title: 'Куда идём кушать?',
	description: 'Концептуальный вопрос',
	config:'checkbox',
	results: {
		'А ты где?': 0,
		'Кубанский парень': 0,
		'KFC': 1,
	},
	bgColor: 'bg-dark',
	textColor: 'text-white',
	createdAt: '23-12-1970 07:48',
	end: true,
});

jest.mock('../../infrastructure/models', function(){
	return jest.requireActual('../../infrastructure/models');
});

jest.mock('../../infrastructure/repositories/surveysRepository', function () {
	const mockSurveysRepository = jest.requireActual('../../infrastructure/repositories/surveysRepository');

	mockSurveysRepository.closeSurvey = async function () {
		return true;
	};

	return mockSurveysRepository;
});

test('Close Survey use case test', async () => {
	const actual = await useCase.execute({id: '06b91703-c50c-4154-8a26-c1440edc9904'});
	expect(actual).toStrictEqual({success: true});
	expect(mockSurvey.end).toBe(true);
});
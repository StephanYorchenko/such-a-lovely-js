/* eslint-disable no-unused-vars, no-undef */
const useCase = require('../closeSurvey');
const { Survey }  = require('../../../infrastructure/surveyStorage');
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

jest.mock('../../../infrastructure/repositories/surveysRepository', function () {
	const mockSurveysRepository = jest.requireActual('../../../infrastructure/repositories/surveysRepository');

	mockSurveysRepository.getSurveyById = function () {
		return mockSurvey;
	};

	return mockSurveysRepository;
});

test('Close Survey use case test', () => {
	const actual = useCase.execute({id: '06b91703-c50c-4154-8a26-c1440edc9904'});
	expect(actual).toStrictEqual({success: true});
	expect(mockSurvey.end).toBe(true);
});
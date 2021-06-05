/* eslint-disable no-unused-vars, no-undef */
const useCase = require('../api/useCases/createSurvey');
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

jest.mock('../../infrastructure/repositories/surveysRepository', function () {
	const mockSurveysRepository = jest.requireActual('../../infrastructure/repositories/surveysRepository');

	mockSurveysRepository.createSurvey = function () {
		return mockSurvey.id;
	};

	return mockSurveysRepository;
});

jest.mock('../../infrastructure/repositories/userRepository', function () {
	const mockUsersRepository = jest.requireActual('../../infrastructure/repositories/userRepository');

	mockUsersRepository.addSurveyToUser = function () {
		return true;
	};

	return mockUsersRepository;
});

jest.mock('../../infrastructure/models', function(){
	return jest.requireActual('../../infrastructure/models');
});

test('Create Survey use case test', async () => {
	const actual = await useCase.execute({id: '06b91703-c50c-4154-8a26-c1440edc9904'}, {session: {user: 'artamaney'}});
	expect(actual).toStrictEqual({success: true});
});
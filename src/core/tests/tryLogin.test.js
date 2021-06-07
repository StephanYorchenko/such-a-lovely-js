/* eslint-disable no-unused-vars, no-undef */
const UseCaseClass = require('../auth/useCases/tryLogin');
const useCase = new UseCaseClass();
const { User } = require('../../infrastructure/userStorage');
const { authenticate } = require('../auth/backend');

beforeEach(() => {
	jest.clearAllMocks();
});

const mockUser = new User({
	name: 'artamaney',
	username: 'artamaney',
	voted: [],
	created: []
});

jest.mock('../../infrastructure/models', function () {
	return jest.requireActual('../../infrastructure/models');
});

jest.mock('../auth/backend', function () {
	const mockBackend = jest.requireActual('../auth/backend');
	mockBackend.authenticate = async function() {
		return [[mockUser.name, 'cool refresh token'], null];
	};

	return mockBackend;
});

test('Success login', async () => {
	const request = { session: {} };
	const actual = await useCase.execute(mockUser, request);
	expect(actual.success).toBeTruthy();
});
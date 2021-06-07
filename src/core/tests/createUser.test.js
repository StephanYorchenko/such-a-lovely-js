/* eslint-disable no-unused-vars, no-undef */
const UseCaseClass = require('../auth/useCases/createUser');
const useCase = new UseCaseClass();
const UserRepository = require('../../infrastructure/repositories/userRepository');

beforeEach(() => {
	jest.clearAllMocks();
});

const mockUser = {
	username: 'artamaney',
	password: 'i love js and S.'
};

jest.mock('../../infrastructure/models', function () {
	return jest.requireActual('../../infrastructure/models');
});

jest.mock('../../infrastructure/repositories/userRepository', function () {
	const mockUserRepository = jest.requireActual('../../infrastructure/repositories/userRepository');

	mockUserRepository.userStorage = [];

	mockUserRepository.createUser = async function (username, password) {
		return username;
	};

	mockUserRepository.getUserById = function () {
		return mockUser;
	};

	return mockUserRepository;
});

test('Success create user', async () => {
	const request = { session: { target: 'https://vk.com' } };
	const actual = await useCase.execute({ username: mockUser.username, password: mockUser.password }, request);

	expect(actual.success).toBeTruthy();
	expect(UserRepository.getUserById('artamaney')).toBe(mockUser);
});
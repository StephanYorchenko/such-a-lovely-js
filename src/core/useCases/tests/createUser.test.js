/* eslint-disable no-unused-vars, no-undef */
const useCase = require('../createUser');
const { User } = require('../../../infrastructure/userStorage');
const UserRepository = require('../../../infrastructure/repositories/userRepository');

beforeEach(() => {
	jest.clearAllMocks();
});

const mockUser = new User({
	name: 'artamaney',
	voted: [],
	created: []
});

jest.mock('../../../infrastructure/repositories/userRepository', function () {
	const mockUserRepository = jest.requireActual('../../../infrastructure/repositories/userRepository');

	mockUserRepository.userStorage = [];

	mockUserRepository.createUser = function (name) {
		return name;
	};

	mockUserRepository.getUserById = function () {
		return mockUser;
	};

	return mockUserRepository;
});

test('Success create user', () => {
	const request = {session: {}};
	const actual = useCase.execute({userName: 'artamaney'}, request);
	expect(actual).toStrictEqual({success: true});
	expect(request.session.user).toBe('artamaney');
	expect(request.session.isLogin).toBe(true);
	expect(UserRepository.getUserById('artamaney')).toBe(mockUser);
});
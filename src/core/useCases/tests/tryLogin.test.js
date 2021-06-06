/* eslint-disable no-unused-vars, no-undef */
const useCase = require('../tryLogin');
const { User } = require('../../../infrastructure/userStorage');
const UserRepository = require('../../../infrastructure/repositories/userRepository');

beforeEach(() => {
    jest.clearAllMocks();
});

const mockUser = new User({
    name: 'artamaney',
    username: 'artamaney',
    voted: [],
    created: []
});

jest.mock('../../../infrastructure/models', function(){
    return jest.requireActual('../../../infrastructure/models');
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

test('Failed login', async () => {
    const request = {session: {}};
    const actual = await useCase.execute({"username": "artamaney", "name": "artamaney"}, request);
    expect(actual.success).toBeFalsy();
    expect(request.session.isLogin).toBe(false);
    expect(UserRepository.getUserById('artamaney')).toBeNull();
});
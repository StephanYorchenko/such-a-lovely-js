/* eslint-disable no-unused-vars, no-undef */
const useCase = require('../tryLogin');

beforeEach(() => {
    jest.clearAllMocks();
});


test('Success create user', async () => {
    const request = {session: {}};
    const actual = await useCase.execute({userName: 'artamaney'}, request);
    expect(actual.success).toBeFalsy();
    expect(request.session.isLogin).toBe(false);
});
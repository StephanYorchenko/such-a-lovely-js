const baseUserRepository = require('../../core/baseRepositories/baseUserRepository');
const userStorage = require('../userStorage');

const UserRepository =
class extends baseUserRepository{
	checkUserExistByID(userID){
		return this.userStorage.includes(userID);
	}
};


module.exports = new UserRepository(userStorage);
const baseUserRepository = require('../../core/baseRepositories/baseUserRepository');
const userStorage = require('../userStorage');

const UserRepository =
class extends baseUserRepository{
	checkUserExistByID(userID){
		return this.userStorage.includes(userID);
	}

	getUserById(userID){
		for (const user of this.userStorage.data)
			if (userID === user.name)
				return user;
	}
};


module.exports = new UserRepository(userStorage);
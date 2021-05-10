const userStorage = require('../userStorage');

class UserRepository{
	constructor(userStorage) {
		this.userStorage = userStorage;
	}

	checkUserExistByID(userID){
		for (const user of this.userStorage)
			if (user.name === userID)
				return true;
		return false;
	}

	getUserById(userID){
		for (const user of this.userStorage)
			if (userID === user.name)
				return user;
	}
}


module.exports = new UserRepository(userStorage);
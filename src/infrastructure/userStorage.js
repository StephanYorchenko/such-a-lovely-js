class User{
	constructor(originData) {
		this.name = originData.name;
		this.voted = originData.voted;
		this.created = originData.created;
	}
}

const userStorage = {
	data: [
		new User({
			name: "asdasd",
			voted: ["7f92dd20-99b6-44a1-bbc2-5dc62e5722d7"],
			created: ["d22a153c-72ca-44d4-b7cb-ad912ed009f8", "9ae892a1-f9e0-4434-aa93-f19817c90063"]
		}),
		new User({
			name: "lolozhkin",
			voted: ["d22a153c-72ca-44d4-b7cb-ad912ed009f8", "9ae892a1-f9e0-4434-aa93-f19817c90063"],
			created: ["7f92dd20-99b6-44a1-bbc2-5dc62e5722d7"]
		})
	],

	includes(userId){
		for (const user of this.data)
			if (user.name === userId)
				return true;
		return false;
	},
};


module.exports = userStorage;
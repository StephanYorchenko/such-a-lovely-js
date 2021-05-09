const userStorage = {
	data: {
		'asdasd': [
			{description: 'Какой-то опрос про тервер'},
			{description: 'Другой опрос про то насколько сильно все любят js'}
		],
		'lololozhkin': [
			{description: 'Кто больше любит жс?'},
		],
	},

	includes(userId){
		return userId in this.data;
	}
};

module.exports = userStorage;
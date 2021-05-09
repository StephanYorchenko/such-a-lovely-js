const userStorage = {
	data: {
		'asdasd': [
			{
				id: "some-strange-uuid",
				title: 'Какой-то опрос про тервер 2',
				description: "Есть идеи как удвоить баллы за пару недель?",
				bgColor: "bg-dark",
				textColor: "text-white"
			},
			{
				title: 'Другой опрос про то насколько сильно все любят js',
				description: "Способны ли вы любить js сильнее, чем это делаю я?"
			}
		],
		'lololozhkin': [
			{
				title: 'Кто больше любит жс?',
				description: "Кто больше любит жс я или артемий рогофф?"
			},
		],
	},

	includes(userId){
		return userId in this.data;
	}
};


module.exports = userStorage;
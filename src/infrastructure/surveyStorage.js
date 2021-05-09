class Survey{
    constructor(originData){
        this.id = originData.id;
        this.title = originData.title;
        this.description = originData.description;

        this.style = {
            bg: originData.bgColor,
            text: originData.textColor
        };

        this.createdAt = originData.createdAt;
        this.closedIn = originData.closedIn;

        this.config = originData.config;
        this.results = originData.results;
    }
}

const surveysStorage = {
    data: [
        new Survey({
            id: "d22a153c-72ca-44d4-b7cb-ad912ed009f8",
            title: 'Какой-то опрос про тервер 2',
            description: "Есть идеи как удвоить баллы за пару недель?",
            config: "multiple",
            bgColor: "bg-dark",
            textColor: "text-white",
            results: {
                "Никак": 1,
                "Просто": 1
            },
            createdAt: "21-07-2020 17:23"
        }),
        new Survey({
            id: "9ae892a1-f9e0-4434-aa93-f19817c90063",
            title: 'Какой-то опрос про тервер 1',
            config:"free",
            description: "Есть идеи как набрать баллы за семестр?",
            results: {
                "Пукать в чат": 0,
                "Пятиминутки": 1
            },
            createdAt: "22-06-2020 16:54"
        }),
        new Survey({
            id: "7f92dd20-99b6-44a1-bbc2-5dc62e5722d7",
            title: 'Кто больший фанат тервера',
            description: "Есть идеи как удвоить баллы за пару недель?",
            config:"radio",
            results: {
                "Пукать в чат": 0,
                "Пятиминутки": 1
            },
            bgColor: "bg-dark",
            textColor: "text-white",
            createdAt: "23-12-1970 07:48"
        }),
    ],

    getCreatedByUser(user){
        const result = [];
        for (const survey of this.data)
            if (user.created.includes(survey.id))
                result.push(survey);
        return result;
    },
};

module.exports = surveysStorage;
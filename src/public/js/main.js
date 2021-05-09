async function getSurveys(){
	// eslint-disable-next-line no-undef
	return await sendRequest('listCreatedSurveys', {});
}

function generateSurveyCard(data){
	const surveyCard = document.createElement('div');
	surveyCard.className = 'card survey-card';
	surveyCard.innerText = data.description;
	return surveyCard;
}

function onload() {
	const root = document.querySelector('#root');
	getSurveys().then((createdSurveys) => {
		for (const survey of createdSurveys){
			const surveyCard = generateSurveyCard(survey);
			root.append(surveyCard);
		}
	});
}

onload();
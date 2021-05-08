async function getSurveys(){
	return await sendRequest('listCreatedSurveys', {});
}

function onload() {
	const root = document.querySelector('#root');
	getSurveys().then((createdSurveys) => {
		for (const survey of createdSurveys){
			const surveyCard = document.createElement('p');
			surveyCard.innerText = survey;
			root.append(surveyCard);
		}
	});
}

onload();
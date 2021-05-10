async function getSurveys(){
	// eslint-disable-next-line no-undef
	return await sendRequest('listVotedSurveys', {});
}

function onload() {
	const root = document.querySelector('#root');
	getSurveys().then((createdSurveys) => {
		for (const survey of createdSurveys){
			// eslint-disable-next-line no-undef
			const surveyCard = generateSurveyCard(survey);
			root.append(surveyCard);
		}
	});
}

onload();
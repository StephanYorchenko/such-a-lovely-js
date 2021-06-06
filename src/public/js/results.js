async function getSurveys(){
	// eslint-disable-next-line no-undef
	return await sendRequest('listVotedSurveys', {});
}

function onload() {
	const root = document.querySelector('#root');
	getSurveys().then((createdSurveys) => {
		if (createdSurveys.length === 0){
			// eslint-disable-next-line no-undef
			root.append(generateEmptyWarning("Здесь будут пройденные Вами опросы"));
		} else{
			for (const survey of createdSurveys){
				// eslint-disable-next-line no-undef
				const surveyCard = generateSurveyCard(survey);
				root.append(surveyCard);
			}
		}
	});
}

onload();
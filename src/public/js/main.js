async function sendRequest(method, params){
	console.log(`Sending ${method} with ${params}`);
	const response =  await fetch(
		'/api', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				method: method,
				params: params
			})
		});
	return await response.json();
}

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
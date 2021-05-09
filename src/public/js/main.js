// eslint-disable-next-line no-unused-vars
async function logout(){
	// eslint-disable-next-line no-undef
	const result = await sendRequest('logout', {});
	if (result.success)
		window.location.href = '/login';
}

async function getSurveys(){
	// eslint-disable-next-line no-undef
	return await sendRequest('listCreatedSurveys', {});
}

function generateSurveyCard(data){
	const surveyCard = document.createElement('div');
	surveyCard.className = `card survey-card mb-3 mt-3 ${data.style.bg || 'bg-light'} ` +
		`${data.style.text || 'text-dark'}`;

	const hidden = document.createElement('span');
	hidden.style.visibility = 'hidden';
	hidden.innerText = data.id;

	const body = document.createElement('div');
	body.className = 'card-body';

	const header = document.createElement('h5');
	header.className = 'card-title';
	header.innerText = data.title;

	const descr = document.createElement('p');
	descr.className = 'card-text';
	descr.innerText =  data.description;

	const footer = document.createElement('p');
	footer.className = 'card-text';
	const creationDate = document.createElement('small');
	creationDate.className = 'text-muted';
	creationDate.innerText = data.createdAt;

	footer.append(creationDate);

	body.append(header);
	body.append(descr);
	body.append(footer);
	surveyCard.append(body);
	surveyCard.append(hidden);
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
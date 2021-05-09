function goToSurvey(id) {
	window.location.href = `/survey/${id}`;
}

async function getSurveys(){
	// eslint-disable-next-line no-undef
	return await sendRequest('listCreatedSurveys', {});
}

function generateSurveyCard(data){
	const surveyCard = document.createElement('div');
	surveyCard.className = `card survey-card mb-3 mt-3 ${data.style.bg || 'bg-light'} ` +
		`${data.style.text || 'text-dark'}`;

	surveyCard.setAttribute('survey', data.id);

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

	surveyCard.addEventListener('click', () => goToSurvey(data.id));
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
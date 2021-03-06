// eslint-disable-next-line no-unused-vars
async function sendRequest(method, params){
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

// eslint-disable-next-line no-unused-vars
async function logout(){
	const result = await sendRequest('logout', {});
	if (result.success)
		window.location.href = '/login';
}

function goToSurvey(id) {
	window.location.href = `/survey/${id}`;
}

// eslint-disable-next-line no-unused-vars
async function updateUserName(){
	const response = await sendRequest('getName', {});
	document.querySelector('#login-field').innerText = response.name;
}

// eslint-disable-next-line no-unused-vars
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

// eslint-disable-next-line no-unused-vars
function generateEmptyWarning(text){
	const warning = document.createElement('figure');
	warning.className = "text-center align-middle";
	const content = document.createElement('blockquote');
	content.className = 'blockquote align-middle';
	const p = document.createElement('p');
	p.className = "display-2 align-middle text-secondary";
	p.innerText = text;
	content.append(p);
	warning.append(content);
	return warning;
}
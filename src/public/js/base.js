let accessToken = null;

// eslint-disable-next-line no-unused-vars
async function sendRequest(endpoint, method, params) {
	let normalizedEndpoint = endpoint;
	if (normalizedEndpoint[0] !== '/') {
		normalizedEndpoint = '/' + normalizedEndpoint;
	}

	const headers = {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	}
	if (accessToken) {
		headers['Authorization'] = accessToken;
	}

	const response = await fetch(
		normalizedEndpoint, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify({
			method: method,
			params: params
		})
	});
	return await response.json();
}

// eslint-disable-next-line no-unused-vars
async function logout() {
	const result = await sendRequest('auth', 'logout', {});
	if (result.success) {
		window.location.href = '/login'; 
	}
}

function goToSurvey(id) {
	window.location.href = `/survey/${id}`;
}

// eslint-disable-next-line no-unused-vars
function generateSurveyCard(data) {
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
	descr.innerText = data.description;

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
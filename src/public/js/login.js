// eslint-disable-next-line no-unused-vars
async function tryLogin() {
	const username = document.forms.login.username.value;
	const password = document.forms.login.password.value;

	const data = { username, password };
	const result = await sendRequest('auth', 'tryLogin', data); // eslint-disable-line no-undef
	if (result.success) {
		console.log(result.target);
		window.location.href = result.target || '/';
	} else {
		document.querySelector('#error').style.visibility = 'visible';
	}
}

// eslint-disable-next-line no-unused-vars
async function tryRegister() {
	const username = document.forms.login.username.value;
	const password = document.forms.login.password.value;

	const data = { username, password };

	const result = await sendRequest('auth', 'createUser', data); // eslint-disable-line no-undef
	if (result.success) {
		let target = result.target || '/';
		console.log(target);
		target = target === '/login' ? '/' : target;
		window.location.href = target;
	} else {
		showError(result.error);
	}
}

function showError(message) {
	const errorMessageField = document.querySelector('#error');
	errorMessageField.style.visibility = 'visible';
	errorMessageField.innerText = message;
}
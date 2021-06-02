// eslint-disable-next-line no-unused-vars
async function tryLogin(){
	const data = {userid: document.forms.login.userid.value};
	const result = await sendRequest('tryLogin', data); // eslint-disable-line no-undef
	if (result.success)
		window.location.href = result.target || '/';
	else
		document.querySelector('#error').style.visibility = 'visible';
}

// eslint-disable-next-line no-unused-vars
async function tryRegister(){
	const data = {userName: document.forms.login.userid.value};
	const result = await sendRequest('createUser', data); // eslint-disable-line no-undef
	if (result.success){
		let target = result.target || '/';
		target = target === '/login' ? '/' : target;
		window.location.href = target;
	} else
		showError(result.error);
}

function showError(message){
	const errorMessageField = document.querySelector('#error');
	errorMessageField.style.visibility = 'visible';
	errorMessageField.innerText = message;

}
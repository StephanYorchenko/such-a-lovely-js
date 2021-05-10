// eslint-disable-next-line no-unused-vars
async function tryLogin(){
	const data = {userid: document.forms.login.userid.value};
	const result = await sendRequest('tryLogin', data); // eslint-disable-line no-undef
	if (result.success)
		window.location.href = result.target || '/';
	else
		document.querySelector('#error').style.visibility = 'visible';
}
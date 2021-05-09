// eslint-disable-next-line no-unused-vars
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

// eslint-disable-next-line no-unused-vars
async function logout(){
	const result = await sendRequest('logout', {});
	if (result.success)
		window.location.href = '/login';
}
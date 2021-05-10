async function _setClosed(id){
	// eslint-disable-next-line no-undef
	return await sendRequest('closeSurvey', {id: id});
}

//eslint-disable-next-line no-unused-vars
function setClosed(id){
	_setClosed(id).then(() => {window.location.reload();});
}

//eslint-disable-next-line no-unused-vars
function copySurveyLink(){
	navigator.clipboard.writeText(window.location.href)
		.then(() => {
			console.log('Successfully copied to clipboard');
		})
		.catch(err => {
			console.log('Something went wrong', err);
		});
}
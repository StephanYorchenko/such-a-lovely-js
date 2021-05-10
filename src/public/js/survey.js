async function _setClosed(id){
	// eslint-disable-next-line no-undef
	return await sendRequest('closeSurvey', {id: id});
}

//eslint-disable-next-line no-unused-vars
function setClosed(id){
	_setClosed(id).then(() => {window.location.reload();});
}
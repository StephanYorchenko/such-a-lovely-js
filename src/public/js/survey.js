async function _setClosed(id){
	// eslint-disable-next-line no-undef
	return await sendRequest('closeSurvey', {id: id});
}

//eslint-disable-next-line no-unused-vars
function setClosed(id){
	_setClosed(id).then(() => {window.location.reload();});
}

function getDataFromCheckbox(){
	const inputElements = document.getElementsByClassName('form-check-input');
	const result = [];
	for(let i=0; inputElements[i]; ++i){
		if(inputElements[i].checked){
			result.push(inputElements[i].value);
		}
	}
	return result;
}

//eslint-disable-next-line no-unused-vars
function sendResponse(id){
	let radioAnswer = document.forms.response.answer.value;
	if (radioAnswer)
		radioAnswer = [radioAnswer];
	const data = {
		response: radioAnswer || getDataFromCheckbox(),
		surveyID: id
	};
	// eslint-disable-next-line no-undef
	sendRequest('replySurvey', data).then(() => {window.location.reload();});
}

//eslint-disable-next-line no-unused-vars
function copySurveyLink(){
	copyToClipboard(window.location.href);
}

function copyToClipboard (str){
	const el = document.createElement('textarea');
	el.value = str;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
}
// eslint-disable-next-line no-unused-vars
function deleteInput() {
	if (this.parentElement.parentElement.parentElement.childElementCount > 3){
		this.parentElement.parentElement.remove();
	} else {
		alert('Необходимо указать хотя бы один вариант ответа, если таких нет, то поставить знак \'-\'');
	}
}

function preventEnter(event){
	event.preventDefault();
	addBtnFunc(event.target)();
}

function preventEnterForAll(){
	for (const input of document.querySelector(".inputAnswer")){
		input.setAttribute('onKeyUp', 'preventEnter')
	}
}

function addBtnFunc(btn){
	return function () {
		const div = document.createElement('div');
		div.className = 'input-group input_instrument';
		const new_input = document.createElement('input');
		new_input.type = 'text';
		new_input.className = 'form-control mb-1 inputAnswer';
		new_input.placeholder = 'Текст';
		new_input.required = true;
		div.append(new_input);
		const div_2 = document.createElement('div');
		div_2.className = 'input-group-prepend';
		const b = document.createElement('button');
		b.className = 'btn btn-outline-secondary btn-danger';
		b.type = 'button';
		b.id = 'button-addon' + c;
		b.innerText = '-';
		b.setAttribute('onclick', 'deleteInput.apply(this)');
		div_2.append(b);
		div.append(div_2);
		btn.before(div);
	};
}
function add_btn(){
	const btn = document.getElementById('add_input');
	const c =  btn.parentElement.childNodes.length;
	btn.onclick = addBtnFunc();
}
// eslint-disable-next-line no-unused-vars
async function createSurvey(){
	const form = document.forms.surveyBuilder;
	const answersFields = document.getElementsByClassName('inputAnswer');
	const listAnswers = [];
	for (const field of answersFields){
		listAnswers.push(field.value);
	}
	const data = {
		title: form.surveyTitle.value,
		description: form.surveyDescription.value,
		config: form.typeSurveyField.value,
		answers: listAnswers,
		bgColor: form.colorCh.value,
		textColor: form.txtCh.value
	};
	// eslint-disable-next-line no-undef
	const result = await sendRequest('createSurvey', data);
	if (result.success)
		window.location.href = '/';
}

window.onload = add_btn;
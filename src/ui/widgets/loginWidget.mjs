const {BaseWidget} = require('./baseWidget.mjs');

export class LoginWidget extends BaseWidget{
	_generateHTML() {
		const form = document.createElement('form');
		form.action = 'tryLogin';
		form.method = 'post';
		const label = document.createElement('label');
		label.for = 'login';
		const login = document.createElement('input');
		login.name = 'login';
		label.append(login);
		label.append('Логин');
		form.append(label);
		const button = document.createElement('button');
		button.innerText = 'Вход';
		form.append(button);
		return form;
	}
}



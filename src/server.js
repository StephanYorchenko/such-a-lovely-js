const express = require('express');
const session = require('express-session');
const store = require('session-file-store')(session);
const manager = require('./infrastructure/managers/manager.js');
const ash = require('express-async-handler');


const app = express();
const port = 31337;

app.use(session({
	store: new store(),
	secret: process.env['APP_SECRET_KEY'] || 'hello',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', './public/templates');
app.set('view engine', 'pug');


app.post('/api', ash(async(req, res) => {
	const result = await manager.tryExecute(req.body.method, req.body.params, req);
	res.send(result);
}));

app.get('/', ash(async(req, res) => {
	if (!req.session.isLogin){
		req.session.targetPage = '/';
		res.redirect('/login');
	}
	else
		res.render('index');
}));

app.get('/results', ash(async(req, res) => {
	if (!req.session.isLogin){
		req.session.targetPage = '/results';
		res.redirect('/login');
	}
	else
		res.render('results');
}));

app.get('/createSurvey', ash(async(req, res) => {
	if (!req.session.isLogin){
		req.session.targetPage = '/createSurvey';
		res.redirect('/login');
	}
	else
		res.render('createSurvey');
}));

app.get('/login', ash(async(req, res) => {
	if (req.session.isLogin)
		res.redirect(req.session.targetPage || '/');
	else
		res.sendFile(__dirname + '/public/templates/login.html');
}));

app.get('/survey/:surveyID', ash(async(req, res) => {
	if (!req.session.isLogin){
		req.session.targetPage = `/survey/${req.params.surveyID}`;
		res.redirect('/login');
	}
	else{
		const surveyData = manager.tryExecute('renderSurvey', {id: req.params.surveyID}, req);
		res.render('survey', surveyData);
	}
}));

app.get('/static/:type/:filename', ash(async(req, res) => {
	res.sendFile(__dirname + '/public/' + req.params.type + '/' + req.params.filename);
}));


app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});

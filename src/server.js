const express = require('express');
const session = require('express-session');
const store = require('session-file-store')(session);
const manager = require('./infrastructure/managers/manager.js');


const app = express();
const port = 31337;

app.use(session({
	store: new store(),
	secret: process.env['SECRET_KEY'] || 'hello',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', './public/templates');
app.set('view engine', 'pug');


app.post('/api', (req, res) => {
	const result = manager.tryExecute(req.body.method, req.body.params, req);
	res.send(result);
});

app.get('/', (req, res) => {
	if (!req.session.isLogin){
		req.session.targetPage = '/';
		res.redirect('/login');
	}
	else
		res.render('index');
});

app.get('/results', (req, res) => {
	if (!req.session.isLogin){
		req.session.targetPage = '/results';
		res.redirect('/login');
	}
	else
		res.render('results');
});

app.get('/login', (req, res) => {
	if (req.session.isLogin)
		res.redirect(req.session.targetPage || '/');
	else
		res.sendFile(__dirname + '/public/templates/login.html');
});

app.get('/survey/:surveyID', (req, res) => {
	if (!req.session.isLogin){
		req.session.targetPage = `/survey/${req.params.surveyID}`;
		res.redirect('/login');
	}
	else{
		const surveyData = manager.tryExecute('renderSurvey', {id: req.params.surveyID}, req);
		console.log(surveyData.data);
		res.render('survey', surveyData);
	}
});

app.get('/static/:type/:filename', (req, res) => {
	res.sendFile(__dirname + '/public/' + req.params.type + '/' + req.params.filename);
});



app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});

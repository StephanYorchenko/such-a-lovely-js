const express = require('express');
const session = require('express-session');
const store = require('session-file-store')(session);
const manager = require('./infrastructure/managers/manager.js');
const log4js = require('log4js');

log4js.configure({
	appenders: {
		tracer: { type: 'stdout', level: 'trace'},
		important: { type: 'file', filename: 'logs/manager.log', maxLogSize: 10 * 1024 * 1024, level: 'info'},
	},
	categories: {
		router: {appenders: ['tracer'], level: 'trace'},
		manager: {appenders: ['important'], level: 'info'},
		default: { appenders: ['tracer', 'important'], level: 'trace'}
	}
});

const logger = log4js.getLogger('router');


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
	logger.trace('Request API ' + req.body.method);
	const result = manager.tryExecute(req.body.method, req.body.params, req);
	res.send(result);
});

app.get('/', (req, res) => {
	logger.trace('Try open / as ' + req.session.user);
	if (!req.session.isLogin){
		req.session.targetPage = '/';
		res.redirect('/login');
	}
	else
		res.render('index');
});

app.get('/results', (req, res) => {
	logger.trace('Try open /results as ' + req.session.user);
	if (!req.session.isLogin){
		req.session.targetPage = '/results';
		res.redirect('/login');
	}
	else
		res.render('results');
});

app.get('/createSurvey', (req, res) => {
	logger.trace('Try create survey as ' + req.session.user);
	if (!req.session.isLogin){
		req.session.targetPage = '/createSurvey';
		res.redirect('/login');
	}
	else
		res.render('createSurvey');
});

app.get('/login', (req, res) => {
	if (req.session.isLogin) {
		logger.info(`Already signed in as ${req.session.user}`);
		res.redirect(req.session.targetPage || '/');
	}
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
		res.render('survey', surveyData);
	}
});

app.get('/static/:type/:filename', (req, res) => {
	res.sendFile(__dirname + '/public/' + req.params.type + '/' + req.params.filename);
});


app.listen(port, () => {
	logger.trace(`Start server at http://localhost:${port}`);
});

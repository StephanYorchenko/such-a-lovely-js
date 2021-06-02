const express = require('express');
const session = require('express-session');
const store = require('session-file-store')(session);
const manager = require('./core/manager.js');
const ash = require('express-async-handler');
const log4js = require('log4js');
const { auth_needed, auth } = require('./core/auth/midleware');


log4js.configure({
	appenders: {
		tracer: { type: 'stdout', level: 'trace' },
		important: { type: 'file', filename: 'logs/manager.log', maxLogSize: 10 * 1024 * 1024, level: 'info' },
	},
	categories: {
		router: { appenders: ['tracer'], level: 'trace' },
		manager: { appenders: ['important'], level: 'info' },
		default: { appenders: ['tracer', 'important'], level: 'trace' }
	}
});

const logger = log4js.getLogger('router');


const app = express();
const port = 31337;

app.use(session({
	store: new store(),
	secret: process.env['APP_SECRET_KEY'] || 'hello',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(auth);
app.set('views', './public/templates');
app.set('view engine', 'pug');

app.post('/api', ash(auth_needed), ash(async (req, res) => {
	logger.trace('Request API ' + req.body.method);
	const result = await manager.tryExecute(req.body.method, req.body.params, req);
	res.send(result);
}));


app.get('/', ash(async (req, res) => {
	logger.trace('Try open / as ' + req.session.user);
	if (!req.session.isLogin) {
		req.header
		req.session.targetPage = '/';
		res.redirect('/login');
	} else {
		res.render('index');
	}
}));

app.get('/results', ash(async (req, res) => {
	logger.trace('Try open /results as ' + req.session.user);
	if (!req.session.isLogin) {
		req.session.targetPage = '/results';
		res.redirect('/login');
	}
	else
		res.render('results');
}));

app.get('/createSurvey', ash(async (req, res) => {
	logger.trace('Try create survey as ' + req.session.user);
	if (!req.session.isLogin) {
		req.session.targetPage = '/createSurvey';
		res.redirect('/login');
	}
	else
		res.render('createSurvey');
}));

app.get('/login', ash(async (req, res) => {
	if (req.session.isLogin) {
		logger.info(`Already signed in as ${req.session.user}`);
		res.redirect(req.session.targetPage || '/');
	} else {
		res.sendFile(__dirname + '/public/templates/login.html');
	}
}));

app.get('/survey/:surveyID', ash(async (req, res) => {
	if (!req.session.isLogin) {
		req.session.targetPage = `/survey/${req.params.surveyID}`;
		res.redirect('/login');
	} else {
		const surveyData = await manager.tryExecute('renderSurvey', { id: req.params.surveyID }, req);
		if (surveyData === null) {
			res.send({ error: 'no such a survey' });
			return;
		}

		res.render('survey', surveyData);
	}
}));

app.get('/static/:type/:filename', ash(async (req, res) => {
	res.sendFile(__dirname + '/public/' + req.params.type + '/' + req.params.filename);
}));


app.listen(port, () => {
	logger.trace(`Start server at http://localhost:${port}`);
});

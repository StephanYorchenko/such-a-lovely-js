const express = require('express')
const session = require('express-session')
const store = require('session-file-store')(session)

const app = express();
const port = 31337;

app.use(express.static(__dirname + 'public'));
app.use(session({
    store: new store(),
    secret: process.env["SECRET_KEY"],
}));
app.use(express.urlencoded({ extended: true }))

function checkCredentials(login){
    return login === "asdasd"; // TODO: add auth;
}

app.post('/tryLogin', (req, res) =>{
    req.session.isLogin = checkCredentials(req.body.login);
    if (req.session.isLogin) {
        res.redirect('/');
    }
    else {
        res.send({success: false});
    }
})

app.get('/', (req, res) => {
    if (!req.session.isLogin)
        res.sendFile(__dirname + "/login.html")
    else
        res.sendFile(__dirname + "/index.html")
})

app.get('/api/listSurveys', (req, res) => {
    req.session.isAdmin = true;
    res.send({
        success: true,
        isAdmin: req.session.isAdmin
    })
})


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})

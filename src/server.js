const express = require('express')
const session = require('express-session')
const store = require('session-file-store')(session)


const app = express()
const port = 31337

app.use(express.json())
app.use(express.static(__dirname + 'public'))
app.use(session({
    store: new store(),
    secret: "send_goge",
}))

const GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ githubId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

function checkCredentials(login){
    return login === "asdasd";
}

app.post('/tryLogin', (req, res) =>{
    console.log(req)
    req.session.isLogin = checkCredentials('wertyuio');
    if (req.session.isLogin)
        res.redirect('/');
    res.send({success: false});
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

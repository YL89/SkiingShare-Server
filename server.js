const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const newAccount = require('./app/middleware/newAccount');
const passport = require('./app/middleware/jwtAuthentication');
const accountAuthentication = require('./app/middleware/accountAuthentication');


var HTTP_PORT = process.env.PORT || 8080;

const db = require('./app/models');

db.mongoose
    .connect("mongodb+srv://dbYuhaoLu:Lsy61627@blog.m2uxn.mongodb.net/user_account?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.get('/', (req, res) => {
    res.json({ message: "Welcome to the app" })
});

app.get('/test/authentication', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send("Success");
})

app.post('/login', accountAuthentication.login);

app.post('/api/register', newAccount.checkDuplicate, newAccount.registerUser);

app.listen(HTTP_PORT, () => {
    console.log("App launched!");
})
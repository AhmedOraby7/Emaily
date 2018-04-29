const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const keys = require('./config/keys');

require('./models/User');
require('./models/Surveys');
require('./services/passport');


const URL = keys.mongoClient;
const connect = mongoose.connect(URL);

connect.then((db) => {
    console.log("Connected Correctly");

}, (err) => {console.log(err);});


const app = express();
app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);


// Telling passport to use cookie inside our application
app.use(passport.initialize());
app.use(passport.session());


require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);


// This for Heroku
if(process.env.NODE_ENV === 'production'){
    // Express will serve up production asserts
    app.use(express.static('client/build'));
    // Express will server up the index.html file
    //   if it does not recognize the route
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

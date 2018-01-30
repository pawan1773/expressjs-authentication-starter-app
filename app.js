/**
 * @author Joginder Pawan Kumar
 * @description app.js is the entry point of our application. 
 */

// import all the modules required for our application.
const express = require('express');
const path = require('path');
const compression = require('compression');
const favicon = require('serve-favicon')
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

// import logger, server, db and passport configuration files.
const logger = require(path.join(__dirname, 'utils/logger'));
const serverConfig = require(path.join(__dirname, 'config/server_config/server-config'));
const dbConfig = require(path.join(__dirname, 'config/db_config/db-config'));
const passportConfig = require(path.join(__dirname, 'config/passport_config/passport'));

// load route configurations.
const loginRoute = require(path.join(__dirname, 'routes/login-route'));

// create an express application.
const app = express();

// compress all responses
app.use(compression());

// for case-sensitive routing
app.set('case sensitive routing', true);

// set path for views.
app.set('views', path.join(__dirname, 'views'));

// set paths for static resources like images, css and js files. 
app.use('/assests/images', express.static(path.join(__dirname, 'public/images')));
app.use('/assests/js', express.static(path.join(__dirname, 'public/javascripts')));
app.use('/assests/css', express.static(path.join(__dirname, 'public/stylesheets')));

// set up view engine
// in our case, we are using ejs for templating.
app.set('view engine', 'ejs');

// set up favicon
app.use(favicon(path.join(__dirname, 'public/icons', 'favicon.ico')));

// using dev server port defined in server-config.js file.
const SERVER_PORT = serverConfig.dev.port;

// uncomment below line for production environment.
// const port = serverConfig.prod.port;
// uncomment below line for testing environment.
// const port = serverConfig.test.port;

// using dev db url defined in db-config.js file.
const DB_URL = dbConfig.dev.getURL();

// uncomment below line for production environment.
// const DB_URL = dbConfig.prod.getURL();
// uncomment below line for testing environment.
// const DB_URL = dbConfig.test.getURL();

// connect to our mongo database
mongoose.connect(DB_URL);

// this will define authentication strategies for login
// and signup, serialize/deserialize user for session.
passportConfig(passport);

// to log every request to the log file and console.
app.use(morgan('combined', { 'stream': logger.stream }));

// to read cookies for authentication purposes.
app.use(cookieParser());

// to support JSON-encoded bodies.
app.use(bodyParser.json());

// to get information from html forms.
app.use(bodyParser.urlencoded({ extended: false }));

// session secret.
app.use(session({
    secret: 'pkitalianz',
    resave: true,
    saveUninitialized: true
}));

// initialize passport.
app.use(passport.initialize());

// restore authentication state from the session, if any.
app.use(passport.session());

// for flash messages stored in session.
app.use(flash());

// use defined routes.
loginRoute(app, passport);

// add other routes here

// handle errors 404 and 500
// make sure these routes are at the last
app.use((req, res) => {
    res.status(404);
    res.render('404', {
        title: '404: File Not Found'
    });
});

app.use((error, req, res, next) => {
    res.status(500);
    res.render('500', {
        title: '500: Internal Server Error',
        error: error
    });
});

// listen to the defined port.
app.listen(SERVER_PORT);


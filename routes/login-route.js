/**
 * @author Joginder Pawan Kumar
 * @description login-route.js contains login, signup and home routes. 
 */

var passportConfig = (app, passport) => {

	// display login page.
	app.get('/', (req, res) => {
		// render login page and pass flash data if it exists.
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// actions after clicking login.
	// redirect to home page on successful login.
	// redirect back to login page if there is an error.
	// show flash messages.
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash: true
	}));

	// display signup page.
	app.get('/signup', (req, res) => {
		// render signup page and pass flash data if it exists.
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// actions after clicking signup.
	// redirect to login page on successful signup.
	// redirect back to signup page if there is an error.
	// show flash messages.
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	// home page must be displayed if the user is logged in the session.
	// use route middleware to verify if the user is already logged in.
	app.get('/home', isLoggedIn, (req, res) => {
		res.render('home.ejs', {
			user: req.user // get the user out of session and pass to template.
		});
	});

	// logout from current session.
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
let isLoggedIn = (req, res, next) => {
	// check if the user is authenticated in the session 
	// if yes, then continue to next.
	if (req.isAuthenticated()) { return next(); }
	// if not then redirect them to the login page.
	res.redirect('/');
}

// expose function to use in our app.
module.exports = passportConfig;
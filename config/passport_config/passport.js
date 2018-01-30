/**
 * @author Joginder Pawan Kumar
 * @description passport.js to set up login/signup strategies. 
 */

// import passport-local strategy module.
const LocalStrategy = require('passport-local').Strategy;

// import the user model.
const User = require('../../models/user');

const passportConfig = (passport) => {

    // serialize the user for the session.
    passport.serializeUser((user, done) => done(null, user.id));

    // deserialize the user.
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });

    // using named strategy for signup.
    // note: if there was no name, it would just be called 'local'.
    passport.use('local-signup', new LocalStrategy({
        // local strategy by default uses username and password.
        // we will override with email.
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        User.findOne({ 'local.email': email }, (err, user) => {
            if (err) { return done(err); }

            // regex to ensure user password must contain at least 8 characters 
            // including at least one upper-case letter, one lower-case letter,
            // one digit and a special character.
            var regexForPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            
            // check if the email is already taken.
            if (user) {
                return done(null, false, req.flash('signupMessage', 'This email has already been taken.'));
            } else if (!regexForPassword.test(password)) {
                return done(null, false, req.flash('signupMessage', 'Weak Password.'));
            } else {
                // create the new user.
                var newUser = new User();

                // set the user's email and password.
                newUser.local.email = email;
                newUser.local.password = newUser.generateHash(password);

                // save the user in db.
                newUser.save((err) => {
                    if (err) { throw err; }
                    return done(null, newUser, req.flash('loginMessage', 'User created successfully.'));
                });
            }
        });
    }));

    // using named strategy for login
    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        // check if the user exists in db
        User.findOne({ 'local.email': email }, (err, user) => {
            if (err) { return done(err); }

            // if no user is found, return the message.
            if (!user) {
                return done(null, false, req.flash('loginMessage', 'No such user exists.')); // req.flash is the way to set flashdata using connect-flash
            }
            // validate the password.
            if (!user.validPassword(password)) {
                return done(null, false, req.flash('loginMessage', 'Invalid password.')); // create the loginMessage and save it to session as flashdata
            }
            // return user after successful validation.
            return done(null, user);
        });
    }));    
};

// expose function to use in app.
module.exports = passportConfig;
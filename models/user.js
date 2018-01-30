/**
 * @author Joginder Pawan Kumar
 * @description user.js contains schema definition for
 * user model and create the model for user.
 */

// import all the required modules
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String,
    }
});

// generating a hash for password.
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// validate the password.
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users.
const userModel = mongoose.model('User', userSchema);

// expose the userModel to use in our app.
module.exports = userModel;

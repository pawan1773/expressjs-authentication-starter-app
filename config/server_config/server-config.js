/**
 * @author Joginder Pawan Kumar
 * @description server-config.js contains port number
 * configurations to be used for development, testing 
 * and production environments. 
 */

// change port as per your requirements.
const PORT = {
    dev: {
        port: process.env.PORT || 3000
    },
    test: {
        port: process.env.PORT || 3000
    },
    prod: {
        port: process.env.PORT || 3000
    }
};

// expose the port number to use in our app.
module.exports = PORT;
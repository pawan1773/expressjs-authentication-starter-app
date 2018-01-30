/**
 * @author Joginder Pawan Kumar
 * @description logger.js contains logging related configurations.
 */

// import winston for logging
const winston = require('winston');
winston.emitErrs = true;

// winston related configurations 
const logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: './logs/app-logs.log',
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

let stream = {
    write: (message, encoding) => logger.info(message)
};

// expose modules to use in our app.
module.exports = {
    logger,
    stream
};
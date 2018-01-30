/**
 * @author Joginder Pawan Kumar
 * @description db-config.js contains mongo database
 * configurations to be used for development, testing 
 * and production environments. 
 */

// change the database properties i.e. username, password, 
// host, port and database name as per your environment.
const URL = {
    dev: {
        username: '<dbuser>',
        password: '<dbpassword>',
        host: '<dbhost>',
        port: '<dbport>',
        database: '<dbname>',
        getURL: function () {
            let url = `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.database}`;
            return url;
        } 
    },
    test: {
        username: '<dbuser>',
        password: '<dbpassword>',
        host: '<dbhost>',
        port: '<dbport>',
        database: '<dbname>',
        getURL: function () {
            let url = `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.database}`;
            return url;
        }  
    },
    prod: {
        username: '<dbuser>',
        password: '<dbpassword>',
        host: '<dbhost>',
        port: '<dbport>',
        database: '<dbname>',
        getURL: function () {
            let url = `mongodb://${this.username}:${this.password}@${this.host}:${this.port}/${this.database}`;
            return url;
        } 
    }
};

// expose the database url to use in our app.
module.exports = URL;


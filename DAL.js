const mongo = require('mongodb');
const CONNECTION_URL = 'mongodb://sol:solsol44@ds249372.mlab.com:49372/heroku_tjxz75h9';
const DB_NAME = 'heroku_tjxz75h9';

module.exports = {

    // ################### CRUD ################### //

    Get: (collection, query, callback) => {
        try {
            mongo.connect(CONNECTION_URL, {
                useNewUrlParser: true
            }, (err, db) => {
                if (err) {
                    handleErros(err, callback);
                } else {
                    db.db(DB_NAME).collection(collection).find(query).toArray((err, result) => {
                        handleDbResult(err, result, callback);
                    });
                }
            });
        } catch (error) {
            handleErros(error);
        }
    },
    Insert: (collection, object, callback) => {
        try {
            mongo.connect(CONNECTION_URL, {
                useNewUrlParser: true
            }, (err, db) => {
                if (err) {
                    handleErros(err, callback);
                } else {
                    db.db(DB_NAME).collection(collection).insertMany(object, (err, result) => {
                        handleDbResult(err, result, callback);
                    });
                }
            });
        } catch (error) {
            handleErros(error);
        }
    },
    Update: (collection, query, updateObject, callback) => {
        try {
            mongo.connect(CONNECTION_URL, {
                useNewUrlParser: true
            }, (err, db) => {
                if (err) {
                    handleErros(err, callback);
                } else {
                    db.db(DB_NAME).collection(collection).updateMany(query, updateObject, (err, result) => {
                        handleDbResult(err, result, callback);
                    });
                }
            });
        } catch (error) {
            handleErros(error);
        }
    },
    Delete: (collection, query, callback) => {
        try {
            mongo.connect(CONNECTION_URL, {
                useNewUrlParser: true
            }, (err, db) => {
                if (err) {
                    handleErros(err, callback);
                } else {
                    db.db(DB_NAME).collection(collection).deleteMany(query, (err, result) => {
                        handleDbResult(err, result, callback);
                    });
                }
            });
        } catch (error) {
            handleErros(error);
        }
    }
}

// ################### Private Methods ################### //

function handleDbResult(err, result, callback) {
    if (err) {
        handleErros(err, callback);
    } else {
        callback(result);
    }
}

function handleErros(err, callback) {
    // log somewhere else
    console.log(err);
    callback(err.name);
}
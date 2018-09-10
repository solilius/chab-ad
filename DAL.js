const mongo = require('mongodb');
const CONNECTION_URL = 'mongodb://sol:solsol44@ds249372.mlab.com:49372/heroku_tjxz75h9';
const DB_NAME = 'heroku_tjxz75h9';

module.exports = {

    Get: (collection, query, callback) => {
        try {
            mongo.connect(CONNECTION_URL, {
                useNewUrlParser: true
            }, (err, db) => {
                if (err) {
                    handleErros('Get', err, callback);
                } else {
                    db.db(DB_NAME).collection(collection).find(query).toArray((err, result) => {
                        handleDbResult(err, result, callback);
                    });
                }
            });
        } catch (error) {
            handleErros('Get', error, callback);
        }
    },
    Insert: (collection, object, callback) => {
        try {
            mongo.connect(CONNECTION_URL, {
                useNewUrlParser: true
            }, (err, db) => {
                if (err) {
                    handleErros('Insert', err, callback);
                } else {
                    db.db(DB_NAME).collection(collection).insertMany(object, (err, result) => {
                        handleDbResult(err, result, callback);
                    });
                }
            });
        } catch (error) {
            handleErros('Insert', error, callback);
        }
    },
    Update: (collection, query, updateObject, callback) => {
        try {
            mongo.connect(CONNECTION_URL, {
                useNewUrlParser: true
            }, (err, db) => {
                if (err) {
                    handleErros('Update', err, callback);
                } else {
                    db.db(DB_NAME).collection(collection).updateMany(query, updateObject, (err, result) => {
                        handleDbResult(err, result, callback);
                    });
                }
            });
        } catch (error) {
            handleErros('Update', error, callback);
        }
    },
    Delete: (collection, query, callback) => {
        try {
            mongo.connect(CONNECTION_URL, {
                useNewUrlParser: true
            }, (err, db) => {
                if (err) {
                    handleErros('Delete', err, callback);
                } else {
                    db.db(DB_NAME).collection(collection).deleteMany(query, (err, result) => {
                        handleDbResult(err, result, callback);
                    });
                }
            });
        } catch (error) {
            handleErros('Delete', error, callback);
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

function handleErros(src, err, callback) {
    LogError(err.name, src,err.message, err);
    console.log(err);
    callback(err.name);
}
function LogError(type, src, msg, excpt){
    let log = {
        type: type,
        source: src,
        message: msg,
        exception: excpt
    }

    this.Insert(LOGS_COL, [log], () => {
        console.log("logged succesfuly");
   });
}
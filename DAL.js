const mongo = require('mongodb');
const CONNECTION_URI = 'mongodb://sol:solsol44@ds249372.mlab.com:49372/heroku_tjxz75h9';
const DB_NAME = 'heroku_tjxz75h9';
const LOGS_COL = 'logs';
let db;

mongo.connect(CONNECTION_URI, (err, database) => {
    if(err){
        console.log(err);
    }else{
        db = database;
    }
});

const DAL = { 

    Get: (collection, query, callback) => {
        try {
            db.db(DB_NAME).collection(collection).find(query).sort( { starting_date: -1 } ).toArray((err, result) => {
                handleDbResult(err, result, callback);
            });
        } catch (error) {
            handleErros('Get', error, callback);
        }
    },
    Insert: (collection, object, callback) => {
        try {
            db.db(DB_NAME).collection(collection).insertMany(object, (err, result) => {
                handleDbResult(err, result, callback);
            });
        } catch (error) {
            handleErros('Insert', error, callback);
        }
    },
    Update: (collection, query, updateObject, toUpsert, callback) => {
        try {
            db.db(DB_NAME).collection(collection).updateMany(query, updateObject, { upsert : toUpsert }, (err, result) => {
                handleDbResult(err, result, callback);
            });
        } catch (error) {
            handleErros('Update', error, callback);
        }
    },
    Delete: (collection, query, callback) => {
        try {
            db.db(DB_NAME).collection(collection).deleteMany(query, (err, result) => {
                handleDbResult(err, result, callback);
            });
        } catch (error) {
            handleErros('Delete', error, callback);
        }
    }
}

module.exports = DAL;
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

    DAL.Insert(LOGS_COL, [log], () => {
        console.log("logged succesfuly");
   });
}
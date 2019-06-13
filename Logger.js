const DAL = require('./DAL');
const LOGS_COL = 'logs';

module.exports = {
    LogError: (type, src, msg, excpt) => {
        let log = {
            type: type,
            source: src,
            message: msg,
            exception: excpt,
            time: new Date()
        }
        sendLog(log);
    },

    LogEvent: (event) => {
        sendLog(event);
    }
}

// ################### Private Methods ################### //

function sendLog(log){
    DAL.Insert(LOGS_COL, [log], () => {
         console.log("logged succesfuly");
    });
}
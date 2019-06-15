const DAL = require('./DAL');
const LOGS_COL = 'logs';

module.exports = {
    LogError: (type, src, msg, excpt) => {
        let log = {
            type: type,
            source: src,
            message: msg,
            exception: excpt
        }
        sendLog(log);
    },

    LogEvent: (event) => {
        sendLog(event);
    }
}

// ################### Private Methods ################### //

function sendLog(log){
    log.time = new Date().toLocaleDateString() + "_" + new Date().toLocaleTimeString();
    DAL.Insert(LOGS_COL, [log], () => {
    });
}
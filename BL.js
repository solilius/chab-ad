const moment = require('moment');
const DAL = require('./DAL');
const schedule = require('node-schedule');
const logger = require('./Logger');
const CAMPAIGN_COL = 'campaigns';
const ADS_COL = 'ads';

module.exports = {
    ActiveCampaignScheuduler: () => {
        try {
            let now = moment().format();
            schedule.scheduleJob('0 0 * * *', function () {
                validateCampaign({ "starting_date": { $lte: now }, "expiration_date": { $gte: now } }, true);
                validateCampaign({ "expiration_date": { $lte: now } }, false);
            });
        } catch (err) {
            handleErrors('CampaignSqudualer', err, () => {
                console.log("CampaignSqudualer falied");
            });
        }
    },
    GetAds: (adsReqArr, callback) => {
        let ads = [];

        try {
            for (let i = 0; i < adsReqArr.length; i++) {
                ads.push(getAd(adsReqArr[i]));
            }

            Promise.all(ads).then((data) => {
                callback(data);
                for (let i = 0; i < data.length; i++) {
                    let query = {
                        campaign: { campaign_id: data[i].campaign_id },
                        ad: { ad_id: data[i].ad_id }
                    };
                    decremetValue(query, 'views_left', () => { });
                }
            });

        } catch (err) {
            handleErrors('GetAds', err, callback);
        }
    },

    AdClicked: (eventObject, callback) => {
        let query = { campaign_id: eventObject.campaign_id };

        try {

            decremetValue(query, 'clicks_left', () => {
                logger.LogEvent(eventObject);
                callback();
            });

        } catch (err) {
            handleErrors('AdClicked', err, callback);
        }
    }
}

// ################### Private Methods ################### //

function getAd(pos) {

    return new Promise((res, rej) => {
        DAL.Get(ADS_COL, { isActive: true, positions: pos }, (data) => {
            if (data.length === 0) {
                res('no_result');
            } else {
                res(data[Math.floor(Math.random() * (data.length))])
            }
        });
    });
}

function validateCampaign(query, active) {
    DAL.Update(CAMPAIGN_COL, query, { $set: { isActive: active } }, (data) => {
        console.log('Campaigns modified: ' + data.modifiedCount);
        validateResources(query, active);
    });
}

function validateResources(query, active) {
    DAL.Update(ADS_COL, query, { $set: { isActive: active } }, (data) => {
        console.log('Resources modified: ' + data.modifiedCount);
    });
}

function decremetValue(query, key, callback) {
    let campaignUpdateQuery = {};
    let adUpdateQuery = {};

    switch (key) {
        case "views_left":
            campaignUpdateQuery = { $inc: { views_left: -1 } };
            adUpdateQuery = { $inc: { views: +1 } };

            break;
        case "clicks_left":
            campaignUpdateQuery = { $inc: { clicks_left: -1 } };
            adUpdateQuery = { $inc: { clicks: +1 } };

            break;
        default:
            callback();

            break;
    }

    DAL.Update(CAMPAIGN_COL, query.campaign, campaignUpdateQuery, (data) => {
        callback();
        DAL.Get(CAMPAIGN_COL, query, (data) => {
            if ((data[0] !== undefined) && ((data[0].views_left <= 0) || (data[0].clicks_left <= 0))) {
                validateCampaign(query, false);
            }
        });
    });

    DAL.Update(ADS_COL, query.ad, adUpdateQuery, (data) => {
        callback();
    });
}

function handleErrors(src, err, callback) {
    logger.LogError(err.id, src, err.message, err);
    console.log(err);
    callback(err.id);
}
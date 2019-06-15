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
                changeCampaignState({ "starting_date": { $lte: now }, "expiration_date": { $gte: now } }, true);
                changeCampaignState({ "expiration_date": { $lte: now } }, false);
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
                    if(data[i] !== "no_result"){
                        decremetValue(data[i].campaign_id, data[i].ad_id, 'views_left');
                    }
                }
            });

        } catch (err) {
            handleErrors('GetAds', err, callback);
        }
    },

    AdClicked: (eventObject) => {

        try {
            decremetValue(eventObject.campaign_id, eventObject.ad_id, 'clicks_left');
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

function changeCampaignState(query, active) {
    DAL.Update(CAMPAIGN_COL, query, { $set: { isActive: active } }, false, (data) => {
        DAL.Update(ADS_COL, query, { $set: { isActive: active } }, false, (data) => {});
    });
}

function decremetValue(campaignId, adId, key) {
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
    }

    DAL.Update(CAMPAIGN_COL, {campaign_id: campaignId}, campaignUpdateQuery, false, (data) => {
        DAL.Get(CAMPAIGN_COL, {campaign_id: campaignId} ,(data) => {
            if ((data[0] !== undefined) && ((data[0].views_left <= 0) || (data[0].clicks_left <= 0))) {
                changeCampaignState({campaign_id: campaignId}, false);
            }
        });
    });

    DAL.Update(ADS_COL, {ad_id: adId}, adUpdateQuery, false, () => {});
}

function handleErrors(src, err, callback) {
    logger.LogError(err.id, src, err.message, err);
    console.log(err);
    callback(err.id);
}
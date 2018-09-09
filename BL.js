const DAL = require('./DAL');
const schedule = require('node-schedule');
const CAMPAIGN_COL = 'campaigns';
const ADS_LOGS_COL = 'ads_logs';
const ADS_COL = 'ads';

module.exports = {
  ActiveCampaignSqudualer: () => {
    schedule.scheduleJob('0 0 * * *', function () {
      deactivateCampaign({ "transaction_details.expiration_date": {$lte: new Date()}}, () => {
        validateResources();
      });
    });
  },
  GetAds: (adsReqArr, callback) => {
    let ads = [];
    for (let i = 0; i < adsReqArr.length; i++) {
      DAL.Get(ADS_COL, {locations: adsReqArr[i]}, (data) =>{
        const adPosition = Math.floor(Math.random() * (data.length+1));
        ads[i] = data[adPosition];
      });
    }
    callback(ads);
  },

  AdClicked: (queryByName, callback) => {
    decremetValue(queryByName, 'clickes_left', () => {
      validateCampaign(queryByName);
      callback();
    });
  },

  AdViewed: (queryByName, callback) => {
    decrenetClicks(queryByName, 'viewes_left', () => {
    validateCampaign(queryByName);
    callback();
    });
  }
}

// ################### Private Methods ################### //

function validateCampaign (queryByName) {
  DAL.Get(CAMPAIGN_COL, queryByName, (data) => {
    if ((data !== null) && ((data.clicks_left <= 0) || (data.clicks_left <= 0))) {
      deactivateCampaign(queryByName, () => {
        deactivateResources(queryByName.name);
      });
    }
  });
}

function deactivateCampaign(query, callback){
  DAL.Update(CAMPAIGN_COL, query, { $set: {isActive: false}}, (data) => {
    callback();
    console.log(queryByName.name, " is not active anymore");
  });
}

function validateResources(){
  DAL.Get(CAMPAIGN_COL, {isActive: false}, 0, (data) => {
    data.forEach(campaign => {
      deactivateResources(campaign.name);
    });
  });
}

function deactivateResources(name){
  DAL.Update(ADS_COL, {campaign_name: name}, {$set: {isActive: false}}, (data) => {
    console.log(ADS_COL, data);
  });
}

function decremetValue(queryByName, key, callback) {
  DAL.Update(CAMPAIGN_COL, queryByName, {$inc: { key: -1} }, (data) => {
    console.log(key + ": " + data);
    writeStatistics();
    callback();
  });
}

function writeStatistics(object) {
  DAL.Insert(ADS_LOGS_COL, object, (data) => {
      console.log('writeStatistics', data);
  });
}
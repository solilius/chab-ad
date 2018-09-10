const DAL = require('./DAL');
const schedule = require('node-schedule');
const CAMPAIGN_COL = 'campaigns';
const LOGS_COL = 'logs';
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
      ads.push(getAd(adsReqArr[i]));
    }

    Promise.all(ads).then((data) => {
      callback(data);
      decrementViews(data);
    });
  },

  AdClicked: (eventObject, callback) => {
    let queryByName = {campaign_name: eventObject.campaign_name};
    
    decremetValue(queryByName, 'clicks_left', () => {
      logEvent(eventObject);
      callback();
    });
  },

  AdViewed: (eventObject, callback) => {
    let queryByName = {campaign_name: eventObject.campaign_name};
    decremetValue(queryByName, 'views_left', () => {
    logEvent(eventObject);
    callback();
    });
  }
}

// ################### Private Methods ################### //

function validateCampaign (queryByName) {
  DAL.Get(CAMPAIGN_COL, queryByName, (data) => {
    if ((data[0] !== undefined) && ((data[0].views_left <= 0) || (data[0].clicks_left <= 0))) {
        deactivateCampaign(queryByName, () => {
      });
    }
  });
}

function deactivateCampaign(query, callback){
  DAL.Update(CAMPAIGN_COL, query, { $set: {isActive: false}}, (data) => {
    console.log(query.campaign_name, " is not active anymore");
    deactivateResources(query.campaign_name);
    callback();
  });
}

function validateResources(){
  DAL.Get(CAMPAIGN_COL, {isActive: false}, (data) => {
    data.forEach(campaign => {
      deactivateResources(campaign.campaign_name);
    });
  });
}

function deactivateResources(name){
  DAL.Update(ADS_COL, {campaign_name: name}, {$set: {isActive: false}}, (data) => {
    console.log("deactivated " + name + " resources", data);
  });
}

function decremetValue(queryByName, key, callback) {
  let updateQuery = {$inc: { clicks_left: -1} };
  if (key === "views_left")
  {
    updateQuery = {$inc: { views_left: -1} };
  }
  DAL.Update(CAMPAIGN_COL, queryByName, updateQuery, (data) => {
    callback();
    validateCampaign(queryByName); 
  });
}

function logEvent(object) {
  DAL.Insert(LOGS_COL, object, (data) => {
      console.log('Event', data);
  });
}

function getAd(pos){
  return new Promise((res, rej) =>{
  DAL.Get(ADS_COL, {isActive: true, positions: pos}, (data) =>{
    if(data.length === 0){
      res({campaign_name: 'no_reslut'});
    }
      res(data[Math.floor(Math.random() * (data.length))])
        });
    });
}

function decrementViews(ads){
  for (let i = 0; i < ads.length; i++) {
    let queryByName = {campaign_name: ads[i].campaign_name};
      decremetValue(queryByName, 'views_left', () =>{
    });
  }
}
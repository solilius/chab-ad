const DAL = require('./DAL');
const schedule = require('node-schedule');
const logger = require('./Logger');
const CAMPAIGN_COL = 'campaigns';
const ADS_COL = 'ads';

module.exports = {
  ActiveCampaignScheuduler: () => {
    try {
      schedule.scheduleJob('0 0 * * *', function () {
        deactivateCampaign({ "expiration_date": {$lte: new Date()}}, () => {
          validateResources();
        });
      });  
    } catch (err) {
      handleErrors('CampaignSqudualer', err, () =>{
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
          decrementViews(data);
        });
      
      } catch (err) {
        handleErrors('GetAds', err, callback);
      }
  },

  AdClicked: (eventObject, callback) => {
    let queryByName = {campaign_name: eventObject.campaign_name};

    try {
      
      decremetValue(queryByName, 'clicks_left', () => {
        logger.LogEvent(eventObject);
        callback();
      });
      
    } catch (err) {
      handleErrors('AdClicked', err, callback);
    }
  },

  AdViewed: (eventObject, callback) => {
    let queryByName = {campaign_name: eventObject.campaign_name};

    try {
      decremetValue(queryByName, 'views_left', () => {
      logger.LogEvent(eventObject);
      callback();
      });   
      
    } catch (err) {
      handleErrors('AdViewed' ,err, callback);
    }
  }
}

// ################### Private Methods ################### //

function getAd(pos){

  return new Promise((res, rej) =>{
  DAL.Get(ADS_COL, {isActive: true, positions: pos}, (data) =>{
    if(data.length === 0){
      res({campaign_name: 'no_result'});
    }else{
      res(data[Math.floor(Math.random() * (data.length))])
    }
      });
    });
}

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

function decrementViews(ads){
  for (let i = 0; i < ads.length; i++) {
    let query = {
        campaign:{campaign_name: ads[i].campaign_name},
        ad: {ad_id: ads[i].ad_id}
      };
      decremetValue(query, 'views_left', () =>{});
  }
}

function decremetValue(query, key, callback) {
  let campaignUpdateQuery = {};
  let adUpdateQuery = {};

  switch (key) {
    case "views_left":
      campaignUpdateQuery = {$inc: { views_left: -1} };
      adUpdateQuery = {$inc: { views: +1} };

      break;
    case "clicks_left":
      campaignUpdateQuery = {$inc: { clicks_left: -1} };
      adUpdateQuery = {$inc: { clicks: +1} };

      break;
      default:
        callback();

      break;
  }

  DAL.Update(CAMPAIGN_COL, query.campaign, campaignUpdateQuery, (data) => {
    callback();
    validateCampaign(query); 
  });

  DAL.Update(ADS_COL, query.ad, adUpdateQuery, (data) => {
    callback();
  });
}

function handleErrors(src, err, callback) {
  logger.LogError(err.name, src ,err.message, err);
  console.log(err);
  callback(err.name);
}
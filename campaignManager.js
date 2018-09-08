const DAL = require('./DAL');
const schedule = require('node-schedule');
const CAMPAIGN_COL = 'campaigns';

module.exports = {
  ActiveCampaignSqudualer: () => {
    schedule.scheduleJob('0 0 * * *', function () {
      DAL.Update(CAMPAIGN_COL, { "transaction_details.expiration_date": {$lte: new Date()} }, {$set: {isActive: false}} ,(data) => {
        console.log(data);
    } );
    });
  },
  AdClicked: (queryByName) => {
    decrenetClicks(queryByName);
    validateIsActive(queryByName);
  }
}

// ################### Private Methods ################### //

function decrenetClicks(queryByName) {
  DAL.Update(CAMPAIGN_COL, queryByName, {
    $inc: {
      clicks_left: -1
    }
  }, (data) => {
    console.log('decrenetClicks:', data);
    // notify someone that the campaign was ended
  });
}

function validateIsActive(queryByName) {
  DAL.Get(CAMPAIGN_COL, queryByName, (data) => {
    if ((data !== null) && (data.clicks_left <= 0)) {
      DAL.Update(CAMPAIGN_COL, queryByName, {
        $set: {
          isActive: false
        }
      }, (data) => {
        console.log('validateIsActive:', data);
      });
    }
  });
}
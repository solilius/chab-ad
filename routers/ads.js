const express = require('express');
const bodyParser = require('body-parser');
const DAL = require('../DAL');
const BL = require('../campaignManager');
const router = express.Router();
const CAMPAIGN_COL = 'campaigns';
const ADS_COL = 'ads';

router.use(bodyParser.json());
BL.ActiveCampaignSqudualer();

DAL.Update(CAMPAIGN_COL, { 
    "transaction_details.expiration_date": {$lte: new Date()} },
     {$set: {isActive: false}
    } ,(data) => {
    console.log(data);
});

// ################### API ################### //

router.get('/', (req, res) => {

    let queryByActive = {isActive: true};
    let adsRequested = req.query.ads.split(',');
    DAL.Get(CAMPAIGN_COL, queryByActive, adsRequested.length, (data) => {
        console.log('writeStatistics', data)
    });
    res.send('ok');
});

router.post('/click', (req, res) => {
    BL.AdClicked({name: req.body.name});
    writeStatistics(req.body);

    res.send("Clicked on '" +  req.body.name + "' got registered");
});

module.exports = [router];

// ################### Private Methods ################### //

function writeStatistics(object) {
    DAL.Insert(ADS_COL, object, (data) => {
        console.log('writeStatistics', data)
    });
}
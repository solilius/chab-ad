const express = require('express');
const bodyParser = require('body-parser');
const DAL = require('../DAL');
const router = express.Router();
router.use(bodyParser.json());
const CAMPAIGN_COL = 'campaigns';
const ADS_COL = 'ads';


// ################### API ################### //

router.get('/', (req, res) => {
    // return ads array
    res.send('ok');
});

router.post('/click', (req, res) => {
    let queryByName = {name: req.body.name};

    decrenetClicks(queryByName);
    validateIsActive(queryByName);
    writeStatistics(req.body);

    res.send("Clicked on '" +  req.body.name + "' got registered");
});

module.exports = [router];

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

function writeStatistics(object) {
    DAL.Insert(ADS_COL, object, (data) => {
        console.log('writeStatistics', data)
    });
}
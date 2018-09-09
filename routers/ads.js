const express = require('express');
const bodyParser = require('body-parser');
const DAL = require('../DAL');
const BL = require('../BL');
const router = express.Router();

router.use(bodyParser.json());
BL.ActiveCampaignSqudualer();

// ################### API ################### //

router.get('/', (req, res) => {
    BL.GetAds(req.query.ads.split(','), (data) => {
        res.send(data);
    });
});

router.post('/click', (req, res) => {
    BL.AdClicked({name: req.body.name}, () => {
        res.send("Clicked on '" +  req.body.name + "' got registered");
    });

});

router.post('/view', (req, res) => {
    BL.AdViewed({name: req.body.name}, () => {
        res.send("View on '" +  req.body.name + "' got registered");
    });
});

module.exports = [router];
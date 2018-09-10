const express = require('express');
const bodyParser = require('body-parser');
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
    BL.AdClicked(req.body, () => {
        res.send("Clicked on '" +  req.body.campain_name + "' got registered");
    });

});

router.post('/view', (req, res) => {
    BL.AdViewed(req.body, () => {
        res.send("View on '" +  req.body.campain_name + "' got registered");
    });
});

module.exports = [router];
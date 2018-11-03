const express = require('express');
const bodyParser = require('body-parser');
const vaild = require('../middlewares/eventValidator');
const BL = require('../BL');
const router = express.Router();

router.use(bodyParser.json());
router.post('*', vaild);

BL.ActiveCampaignScheuduler();

// ################### API ################### //

router.get('/', (req, res) => {
    BL.GetAds(req.query.ads.split(','), (data) => {
        res.send(data);
    });
});

router.post('/click', (req, res) => {
    BL.AdClicked(req.body, () => {
        res.send("Clicked on '" +  req.body.campaign_id + "' got registered");
    });

});

router.post('/view', (req, res) => {
    BL.AdViewed(req.body, () => {
        res.send("View on '" +  req.body.campaign_id + "' got registered");
    });
});

module.exports = [router];
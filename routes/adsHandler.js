const express = require('express');
const bodyParser = require('body-parser');
const vaild = require('../middlewares/eventValidator');
const BL = require('../BL');
const router = express.Router();

router.use(bodyParser.json());
router.post('*', vaild);

BL.ActiveCampaignScheuduler( '0 * * * *');
BL.ActiveEmailReminder( '0 8 * * *');

// ################### API ################### //

router.get('/', (req, res) => {
    BL.GetAds(req.query.banners.split(','), (data) => {
        res.send(data);
    });
});

router.get('/status', (req, res) => {
    BL.GetAdStatus(req.query.banners.split(','), (data) => {
        res.send(data);
    });
});

router.post('/click', (req, res) => {
    BL.AdClicked(req.body);
    res.send();
});
module.exports = [router];
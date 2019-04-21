const express = require('express');
const DAL = require('../DAL');
const BL = require('../BL');
const bodyParser = require('body-parser');
const auth = require('../middlewares/authenticator');
const vaild = require('../middlewares/campaignVaidator');
const router = express.Router();
const CAMPAIGN_COL = 'campaigns';
const ADS_COL = 'ads';

router.use(bodyParser.json());
router.use('*', auth);
router.post('/', vaild);

// ################### API ################### //

router.get('/', (req, res) => {
    DAL.Get(CAMPAIGN_COL, {}, (data) => {
        res.send(data);
    });
});

router.get('/:id', (req, res) => {
    DAL.Get(CAMPAIGN_COL, { campaign_id: req.params.id }, (data) => {
        res.send(data);
    });
});

router.post('/', (req, res) => {

    req.body.expiration_date = new Date(req.body.expiration_date);
    DAL.Insert(CAMPAIGN_COL, [req.body], (data) => {
        res.send(data);
    });
});

router.put('/:id', (req, res) => {

    let banner = {
        campaign_name: req.body.campaign_name,
        starting_date: req.body.starting_date,
        expiration_date: req.body.expiration_date,
        clicks_left: req.body.clicks_left,
        views_left: req.body.views_left,
        isActive: req.body.isActive
    }

    DAL.Update(CAMPAIGN_COL, { campaign_id: req.params.id }, { $set: req.body }, (data) => {

        // update the banners data
        DAL.Update(ADS_COL, { campaign_id: req.params.id }, { $set: banner }, (data) => {
            res.send(data);
        });
    });
});

router.delete('/:id', (req, res) => {
    DAL.Delete(CAMPAIGN_COL, { campaign_id: req.params.id }, (data) => {
        res.send(data);
    });
});

module.exports = [router];
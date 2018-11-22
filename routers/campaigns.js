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
    DAL.Update(CAMPAIGN_COL, { campaign_id: req.params.id }, { $set: req.body }, (data) => {
        res.send(data);
    });
});

router.put('/:id/name', (req, res) => {

    DAL.Update(CAMPAIGN_COL, { campaign_id: req.params.id }, { $set: req.body }, (data) => {
        res.send(data);
    });

    DAL.Update(ADS_COL, { campaign_id: req.params.id }, { $set: req.body }, (data) => {
    });
});

router.put('/:id/date', (req, res) => {
    data = req.body;
    data.isActive = false;

    if (new Date(data.starting_date).getTime() / 1000 < new Date().getTime() / 1000) {
        data.isActive = true;
    }

    DAL.Update(CAMPAIGN_COL, { campaign_id: req.params.id }, { $set: data }, (data) => {
        console.log(1, data);
        res.send(data);
    });
    DAL.Update(ADS_COL, { campaign_id: req.params.id }, { $set: data }, (data) => {
        console.log(2, data);
    });
});

router.put('/:id/counter', (req, res) => {
    DAL.Update(CAMPAIGN_COL, { campaign_id: req.params.id }, { $set: req.body }, (data) => {
        BL.ValidatCounter({ campaign_id: req.params.id });
        res.send(data);
    });
});


router.delete('/:id', (req, res) => {
    DAL.Delete(CAMPAIGN_COL, { campaign_id: req.params.id }, (data) => {
        res.send(data);
    });
});

module.exports = [router];
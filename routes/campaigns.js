const express = require('express');
const DAL = require('../DAL');
const bodyParser = require('body-parser');
const vaild = require('../middlewares/campaignVaidator');
const router = express.Router();
const CAMPAIGN_COL = 'campaigns';

router.use(bodyParser.json());
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

    DAL.Update(CAMPAIGN_COL, { campaign_id: req.params.id }, { $set: req.body }, true, (data) => {
        res.send(data);
    });
});

router.delete('/:id', (req, res) => {
    DAL.Delete(CAMPAIGN_COL, { campaign_id: req.params.id }, (data) => {
        res.send(data);
    });
});

module.exports = [router];
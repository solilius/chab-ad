const express = require('express');
const DAL = require('../DAL');
const bodyParser = require('body-parser');
const auth = require('../middlewares/authenticator');
const router = express.Router();
const CAMPAIGN_COL = 'campaigns';

router.use(bodyParser.json());
router.use('*', auth);

// ################### API ################### //

router.get('/checkname/:name', (req, res) => {
    DAL.Get(CAMPAIGN_COL, {campaign_name: req.params.name}, (data) => {
        res.send(data.length === 0);
    });
});


router.get('/', (req, res) => {
    DAL.Get(CAMPAIGN_COL, {}, (data) => {
        res.send(data);
    });
});

router.get('/:name', (req, res) => {
    DAL.Get(CAMPAIGN_COL, {campaign_name: req.params.name}, (data) => {
        res.send(data);
    });
});

router.post('/', (req, res) => {
    
    req.body.transaction_details.expiration_date = new Date(req.body.transaction_details.expiration_date);
    DAL.Insert(CAMPAIGN_COL, [req.body], (data) => {
        res.send(data);
    });
});

router.put('/:name', (req, res) => {
    DAL.Update(CAMPAIGN_COL, {campaign_name: req.params.name}, {$set: req.body}, (data) => {
        res.send(data);
   });
});

router.delete('/:name', (req, res) => {
    DAL.Delete(CAMPAIGN_COL, {campaign_name: req.params.name}, (data) => {
        res.send(data);
    });
});

module.exports = [router];
const express = require('express');
const DAL = require('../DAL');
const bodyParser = require('body-parser');
const auth = require('../middlewares/authenticator');
const router = express.Router();
const CAMPAIGN_COL = 'campaigns';

router.use(bodyParser.json());
router.use('*', auth);

// ################### API ################### //

router.get('/', (req, res) => {
    DAL.Get(CAMPAIGN_COL, {}, 0, (data) => {
        res.send(data);
    });
});

router.get('/checkname/:name', (req, res) => {
    DAL.Get(CAMPAIGN_COL, {name: req.params.name}, 0, (data) => {
        res.send(data.length === 0);
    });
});

router.get('/:name', (req, res) => {
    DAL.Get(CAMPAIGN_COL, {name: req.params.name}, 1, (data) => {
        res.send(data);
    });
});

router.post('/', (req, res) => {
    DAL.Insert(CAMPAIGN_COL, req.body, (data) => {
        res.send(data);
    });
});

router.put('/:name', (req, res) => {
    DAL.Update(CAMPAIGN_COL, {name: req.params.name}, {$set: req.body}, (data) => {
        res.send(data);
   });
});

router.delete('/:name', (req, res) => {
    DAL.Delete(CAMPAIGN_COL, {name: req.params.name}, (data) => {
        res.send(data);
    });
});

module.exports = [router];
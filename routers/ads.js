const express = require('express');
const bodyParser = require('body-parser');
const DAL = require('../DAL');
const auth = require('../middlewares/authenticator');
const router = express.Router();
const ADS_COL = 'ads';

router.use(bodyParser.json());
router.use('*', auth);

// ################### API ################### //

router.get('/', (req, res) => {
    DAL.Get(ADS_COL, {}, 0, (data) => {
        res.send(data);
    });
});

router.get('/:name', (req, res) => {
    DAL.Get(ADS_COL, {campaingn_name: req.params.name}, 0, (data) => {
        res.send(data);
    });
});

router.post('/', (req, res) => {
        DAL.Insert(ADS_COL, req.body, (data) => {
        res.send(data);
    });
});

router.put('/:name', (req, res) => {
    DAL.Update(ADS_COL, {campaingn_name: req.params.name}, {$set: req.body}, (data) => {
        res.send(data);
   });
});

router.delete('/:name', (req, res) => {
    DAL.Delete(ADS_COL, {campaingn_name: req.params.name}, (data) => {
        res.send(data);
    });
});

module.exports = [router];
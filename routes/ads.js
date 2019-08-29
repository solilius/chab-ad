const express = require("express");
const bodyParser = require("body-parser");
const DAL = require("../DAL");
const vaild = require("../middlewares/adValidator");

const router = express.Router();
const ADS_COL = "ads";

router.use(bodyParser.json());
router.post("/", vaild);

// ################### API ################### //

router.get("/", (req, res) => {
  DAL.Get(ADS_COL, {}, data => {
    res.send(data);
  });
});

router.get("/:id", (req, res) => {
  DAL.Get(ADS_COL, { campaign_id: req.params.id }, data => {
    res.send(data);
  });
});

router.post("/", (req, res) => {
  if (req.body.banners.length !== 0) {
    DAL.Insert(ADS_COL, req.body.banners, data => {
      res.send(data);
    });
  } else {
    res.send("no banners added");
  }
});

router.put("/", (req, res) => {
    req.body.banners.forEach(banner => {
        if(banner !== null){
            DAL.Update(ADS_COL,{ ad_id: banner.ad_id },{ $set: banner }, true, data => {});
        }
    });
    res.send("updated");
});

router.delete("/", (req, res) => {
  DAL.Delete(ADS_COL, { ad_id: req.body.id }, data => {
    res.send(data);
  });
});

router.delete("/campaign/:campaignId", (req, res) => {
  DAL.Delete(ADS_COL, { campaign_id: req.params.campaignId }, data => {
    res.send(data);
  });
});

module.exports = [router];
const express = require("express");
const passport = require('passport');
const DAL = require("../DAL");
const bodyParser = require("body-parser");
const vaild = require("../middlewares/campaignVaidator");
const router = express.Router();
const CAMPAIGN_COL = "campaigns";
const ADS_COL = "ads";

router.use(passport.authenticate('jwt', { session: false }));
router.use(bodyParser.json());
router.post("/", vaild);

// ################### API ################### //

router.get("/", (req, res) => {
  DAL.Get(CAMPAIGN_COL, {}, data => {
    res.send(data);
  });
});

router.get("/duplicate/:id", (req, res) => {

  // Get the campaign details
  DAL.Get(CAMPAIGN_COL, { campaign_id: req.params.id }, campaigns => {

    // Insert the duplicated campaign
    DAL.Insert(CAMPAIGN_COL, [duplicateCampaign(campaigns[0])], data => {

      // Get the related ads
      DAL.Get(ADS_COL, { campaign_id: req.params.id }, ads => {

        // Insert the duplicated ads
        DAL.Insert(ADS_COL, duplicateAds(ads), data =>{
            res.send(req.params.id + "2");
        });
      });
    });
  });
});

router.get("/:id", (req, res) => {
  DAL.Get(CAMPAIGN_COL, { campaign_id: req.params.id }, data => {
    res.send(data);
  });
});

router.post("/", (req, res) => {
  DAL.Insert(CAMPAIGN_COL, [req.body], data => {
    res.send(data);
  });
});

router.put("/:id", (req, res) => {
  DAL.Update(
    CAMPAIGN_COL,
    { campaign_id: req.params.id },
    { $set: req.body },
    true,
    data => {
      res.send(data);
    }
  );
});

router.delete("/:id", (req, res) => {
  DAL.Delete(CAMPAIGN_COL, { campaign_id: req.params.id }, data => {
    res.send(data);
  });
});

module.exports = [router];

function duplicateCampaign(data) {
  data._id = data._id + "2";
  data.campaign_id = data.campaign_id + "2";
  data.campaign_name = data.campaign_name + " 2 ";
  return data;
}

function duplicateAds(data){
    data.forEach(ad => {
       ad._id = ad._id + "2";
       ad.campaign_id = ad.campaign_id + "2";
       ad.campaign_name = ad.campaign_name + " 2 ";
    });

    return data;
}
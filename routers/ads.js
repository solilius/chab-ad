const express = require("express");
const bodyParser = require("body-parser");
const DAL = require("../DAL");
const auth = require("../middlewares/authenticator");
const vaild = require("../middlewares/adValidator");

const router = express.Router();
const ADS_COL = "ads";

router.use(bodyParser.json());
router.use("*", auth);
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

router.put("/:name", (req, res) => {
  DAL.Update(
    ADS_COL,
    { campaign_id: req.params.name },
    { $set: req.body },
    data => {
      res.send(data);
    }
  );
});

router.delete("/:name", (req, res) => {
  DAL.Delete(ADS_COL, { campaign_id: req.params.name }, data => {
    res.send(data);
  });
});

module.exports = [router];

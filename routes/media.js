const express = require("express");
const passport = require("passport");
const base64ToImage = require("base64-to-image");
const fs = require("fs");
const Client = require("ssh2-sftp-client-fast");
const DAL = require("../DAL");
const bodyParser = require("body-parser");
const router = express.Router();
const MEDIA_COL = "media";
const FTP_BASE_URL = "http://devchabadinfoh.wpengine.com";
const FTP_PATH = "/chab-ad/";

const CONNECTION = {
  host: "devchabadinfoh.sftp.wpengine.com",
  port: 2222,
  username: "devchabadinfoh-dev_user",
  password: "LWzciMez2p4B"
};

router.use(bodyParser.json({ limit: "10mb", extended: true }));
router.use(passport.authenticate("jwt", { session: false }));

// ################### API ################### //

let sftp = new Client();
sftp.connect(CONNECTION);

router.get("/", (req, res) => {
  DAL.GetLimited(MEDIA_COL, {}, 30, data => {
    res.send(data);
  });
});

router.put("/", (req, res) => {
  // Convert to file
  let file = base64ToImage(req.body.base64, `./`);

  let sftp = new Client();
  sftp.connect(CONNECTION).then(() => {

    // Copy to FTP server
    sftp.put(`${__dirname}/../${file.fileName}`, `${FTP_PATH}${file.fileName}`).then(data => {

        // Delete the file localy
        fs.unlink(`${__dirname}/../${file.fileName}`, () => {

          // Save object in the DB
          DAL.Insert(MEDIA_COL, [getMediaObject(file.fileName, req.body.dimensions )], data => {
            res.send("uploaded");
            sftp.end();
          });
        });
      }).catch(err => {
        console.log(err);
        res.send("falied");
        sftp.end();
      })
  });
});

router.delete("/:filename", (req, res) => {
  let sftp = new Client();
  sftp.connect(CONNECTION).then(() =>{

    // Delete file from FTP server  
    sftp.delete("/chab-ad/" + req.params.filename).then(data => {

      // Delete object from the DB  
      DAL.Delete(MEDIA_COL, { name: req.params.filename }, data => {
        res.send("deleted");
        sftp.end();
      });
    }).catch(err => {
      console.log(err);
      res.send("falied");
      sftp.end();
    });
  });
});

module.exports = [router];

function getMediaObject(fileName, dimensions) {
  return {
    url: FTP_BASE_URL + FTP_PATH + fileName,
    ftp_path: FTP_PATH + fileName,
    width: dimensions.width,
    height: dimensions.height,
    date: new Date(Date.now()).toISOString()
  };
}

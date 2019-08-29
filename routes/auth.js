require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const bcrypt = require("bcryptjs");
const secret = process.env.secret;
const jwt = require("jsonwebtoken");
const DAL = require("../DAL");
const USER_COL = "users";
router.use(bodyParser.json());

router.post("/register", (req, res) => {
  DAL.Get(USER_COL, { username: req.body.username }, user => {
    if (user.length > 0) {
      let error = "שם המשתמש קיים במערכת";
      return res.status(400).json(error);
    } else {
      const newUser = {
        username: req.body.username,
        password: req.body.password
      };
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err;
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          DAL.Insert(USER_COL, [newUser], user => {
            res.send(user);
          });
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  DAL.Get(USER_COL, { username: req.body.username }, user => {
    if (user.length === 0) {
      res.send("שם המשתמש אינו קיים");
    } else {
      bcrypt.compare(req.body.password, user[0].password).then(isMatch => {
        if (isMatch) {
          const payload = {
            id: user[0]._id,
            username: user[0].username
          };
          jwt.sign(
            payload,
            secret,
            { expiresIn: 86400 * 365 },
            (err, token) => {
              if (err) {
                res
                  .status(500)
                  .send({ error: "Error signing token", raw: err });
              }
              res.send(`Bearer ${token}`);
            }
          );
        } else {
          res.send("הסיסמה שגויה");
        }
      });
    }
  });
});

module.exports = router;

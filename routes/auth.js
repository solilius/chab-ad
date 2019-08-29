require('dotenv').config();

const router = require('express').Router()
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');
const secret = process.env.secret;
const jwt = require('jsonwebtoken');
const DAL = require('../DAL');
const USER_COL = "users";

router.use(bodyParser.json());

router.post('/register', (req,res) => {
     DAL.Get(USER_COL, {email: req.body.email}, (user) => {
             if(user.length > 0){
                let error = 'Email Address Exists in Database.';
                return res.status(400).json(error);
             } else {
                const newUser = {
                      email: req.body.email,
                      password: req.body.password
                 };
                 bcrypt.genSalt(10, (err, salt) => {
                    if(err) throw err;
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        DAL.Insert(USER_COL, [newUser], (user) =>{
                            res.send(user);
                         });
                   });
               });
          }
     });
});

router.post('/login', (req,res) => {
    DAL.Get(USER_COL, { email:  req.body.email},(user) => {
      if (user.length === 0) {
         return res.status(404).json("no email found");
      }
      bcrypt.compare(req.body.password, user[0].password).then(isMatch => {
         if (isMatch) {
            const payload = {
               id: user[0]._id,
               email: user[0].email
            };
         jwt.sign(payload, secret, { expiresIn: 86400 * 365 },
               (err, token) => {
                  if (err){
                   res.status(500).json({ error: "Error signing token",raw: err }); 
                  }
                  res.json({ success: true,token: `Bearer ${token}` });
         });      
      } else {
         res.status(401).json("Password is incorrect");
   }
      });
    });
});

module.exports = router;
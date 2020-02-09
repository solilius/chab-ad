// ############################################## //
// ################# - ChabAd - ################# //
// ############################################## //

const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const auth = require('./routes/auth');
const port = process.env.PORT || 3000;

app.use(passport.initialize());
app.use(express.static(__dirname + '/public'));
app.use(cors());

require('dotenv').config();
require('./middlewares/passport-config')(passport);

// ################ ROUTERS ################# //

let campaigns = require('./routes/campaigns');
let adsHandler = require('./routes/adsHandler');
let media = require('./routes/media');
let ads = require('./routes/ads');

// ################## API ################### //

app.use('/campaigns', campaigns);
app.use('/bannersHandler', adsHandler);
app.use('/banners', ads);
app.use('/media', media);
app.use('/auth', auth);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index/index.html');
});

// ############# Start Server ############### //

app.listen(port, (err) => {
    if (err){
        console.log(err);
    } else {
        console.log('Server is up, Port: ' + port);
    }
});
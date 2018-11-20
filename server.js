// ############################################## //
// ################# - ChabAd - ################# //
// ############################################## //

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(__dirname + '/public'));

// ################ ROUTERS ################# //

let campaigns = require('./routers/campaigns');
let adsHandler = require('./routers/adsHandler');
let ads = require('./routers/ads');

// ################## API ################### //

app.use('/campaigns', campaigns);
app.use('/adsHandler', adsHandler);
app.use('/banners', ads);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/Index/index.html');
});

// ############# Start Server ############### //

app.listen(port, (err) => {
    if (err){
        console.log(err);
    } else {
        console.log('Server is up, Port: ' + port);
    }
});

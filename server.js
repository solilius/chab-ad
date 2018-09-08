// ############################################## //
// ################# - ChabAd - ################# //
// ############################################## //

const express = require('express');
const app = express();
const port = 8080;

app.use(express.static(__dirname + '/public'));

// ################ ROUTERS ################# //

let campaigns = require('./routers/campaigns');
let ads = require('./routers/ads');

// ################## API ################### //

app.use('/campaigns', campaigns);
app.use('/ads', ads);

app.get('/', (req, res) => {
    res.sendFile('./index.html');
});

// ############# Start Server ############### //

app.listen(port, (err) => {
    if (err){
        console.log(err);
    } else {
        console.log('Server is up, Port: ' + port);
    }
});
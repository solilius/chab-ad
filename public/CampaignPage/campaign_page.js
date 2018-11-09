var TIME_STAMP_EXT = "T00:00:00.000Z";

if (localStorage.getItem("campaign") != "none") {

    axios({
        url: '/campaigns/',
        method: 'get',
        headers: { "auth": "1234" }
    }).then(function (data) {

        if (data.data.length !== 0) {
            loadCampaignData(data.data[0]);
            loadOwnerData();
            //loadAds();
        }
    });
    //localStorage.setItem("campaign", "none");
}


function loadCampaignData(campaign) {

    document.getElementById('campaign_id').value = campaign.campaign_id;
    document.getElementById('description').value = campaign.description;
    document.getElementById('views').value = campaign.transaction_details.views;
    document.getElementById('clicks').value = campaign.transaction_details.clicks;
    document.getElementById('starting_date').value = campaign.transaction_details.starting_date.split(TIME_STAMP_EXT)[0];
    document.getElementById('expiration_date').value = campaign.transaction_details.expiration_date.split(TIME_STAMP_EXT)[0];
    document.getElementById('views_left').value = campaign.views_left;
    document.getElementById('clicks_left').value = campaign.clicks_left;
}

function loadOwnerData() {
    //TODO: load onwer shit
}

function loadAds() {

    console.log('/campaigns/' + localStorage.getItem("campaign"));
    axios({
        url: '/banners/' + localStorage.getItem("campaign"),
        method: 'get',
        headers: { "auth": "1234" }
    }).then(function (data) {
        var li = "";
        data.data.forEach(ad => {
            li += "<li><img class='ad' src='" + ad.url + "'></li>";
        });
        document.getElementById("ads-list").innerHTML = li;
    });
}


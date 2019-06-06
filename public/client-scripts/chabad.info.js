var SERVER = "https://chab-ad.herokuapp.com";
var IDS = ["chabadinfo.com-example_1"];
var MOBILE_IDS = ["chabadinfo.com-example_1-m"];
var currIds = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? MOBILE_IDS : IDS;
var ads_array = [];

requestAds();

function requestAds(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
                insertAds(JSON.parse(xhr.response));
        }
    };
    xhr.open('GET', SERVER + '/bannersHandler/?banners=' + idsToString(currIds));
    xhr.send();
}

function insertAds(ads){
    ads_array = ads;
    for(var i=0; i < ads.length; i++){
        var banner = document.getElementById(currIds[i]);
        if(ads[i].url !== null){
        banner.src = ads[i].url;
        banner.name = i;
        } else{
            banner.src = "https://chab-ad.herokuapp.com/empty.jpg"
        }
    }
}

function idsToString(arr){
    var str = "";
    for(var i=0; i < arr.length; i++){
        str += arr[i] + ',';
    }
    return str.substring(0, str.length-1);
}

function onAdClicked(event, index){
    var body = {
        campaign_id: ads_array[index].campaign_id,
        ad_id: ads_array[index].ad_id,
        action: "clicked",
        message: "banner got clicked",
        site: location.href,
        ad_position: event.currentTarget.id,
        ip: "ip",
        date: new Date()
    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', SERVER + '/bannersHandler/click', true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(body));

    window.open(ads_array[index].onclick, '_blank');
}
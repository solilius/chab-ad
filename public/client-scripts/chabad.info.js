var SERVER = "https://chab-ad.herokuapp.com";
var IDS = [
    "chabad.info-post_1",
    "chabad.info-post_2",
    "chabad.info-post_3",
    "chabad.info-post_4",
    "chabad.info-post_5",
    "chabad.info-post_6",
    "chabad.info-post_7",
    "chabad.info-post_8",
    "chabad.info-post_9",
    "chabad.info-post_10",
    "chabad.info-post_11",
    "chabad.info-post_12",
    "chabad.info-post_13",
    "chabad.info-post_14",
    "chabad.info-post_15",
    "chabad.info-post_16",
    "chabad.info-post_17",
    "chabad.info-post_18",
    "chabad.info-post_19",
    "chabad.info-post_20",
    "chabad.info-post_21",
    "chabad.info-post_22",
    "chabad.info-post_23",
    "chabad.info-post_24",
    "chabad.info-post_25",
    "chabad.info-post_26",
    "chabad.info-post_27",
    "chabad.info-post_28",
    "chabad.info-post_29",
    "chabad.info-post_30",
    "chabad.info-post_31",
    "chabad.info-post_32",
    "chabad.info-post_33",
    "chabad.info-post_34",
    "chabad.info-post_35",
    "chabad.info-post_36"
];

var MOBILE_IDS =[
    "chabad.info-post_1-m",
    "chabad.info-post_2-m",
    "chabad.info-post_3-m",
    "chabad.info-post_4-m",
    "chabad.info-post_5-m",
    "chabad.info-post_6-m",
    "chabad.info-post_7-m",
    "chabad.info-post_8-m",
    "chabad.info-post_9-m",
    "chabad.info-post_10-m",
    "chabad.info-post_11-m",
    "chabad.info-post_12-m",
    "chabad.info-post_13-m",
    "chabad.info-post_14-m",
    "chabad.info-post_15-m",
    "chabad.info-post_16-m",
    "chabad.info-post_17-m",
    "chabad.info-post_18-m",
    "chabad.info-post_19-m",
    "chabad.info-post_20-m",
    "chabad.info-post_21-m",
    "chabad.info-post_22-m",
    "chabad.info-post_23-m",
    "chabad.info-post_24-m",
    "chabad.info-post_25-m",
    "chabad.info-post_26-m",
    "chabad.info-post_27-m",
    "chabad.info-post_28-m",
    "chabad.info-post_29-m",
    "chabad.info-post_30-m",
    "chabad.info-post_31-m",
    "chabad.info-post_32-m",
    "chabad.info-post_33-m",
    "chabad.info-post_34-m",
    "chabad.info-post_35-m",
    "chabad.info-post_36-m"
];

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
        if(ads[i] !== "no_result"){
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
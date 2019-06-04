var IDS = ["chabadinfo.com-example_1"];
var MOBILE_IDS = ["chabadinfo.com-example_1-m"];
var currIds = ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? MOBILE_IDS : IDS;

requestAds();

function requestAds(){
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
        insertAds(JSON.parse(xhr.response));
  }
};
xhr.open('GET', '/bannersHandler/?banners=' + idsToString(currIds));
xhr.send();
}

function insertAds(ads){
    for(var i=0; i < ads.length; i++){
        var banner = document.getElementById(currIds[i]);
        banner.src = ads[i].url;
        banner.name = ads[i].onclick;
    }
}

function idsToString(arr){
    var str = "";
    for(var i=0; i < arr.length; i++){
        str += arr[i] + ',';
    }
    return str.substring(0, str.length-1);
}

function onAdClicked(url){
    window.open(url, '_blank');
}
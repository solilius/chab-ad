var SERVER = "https://chab-ad.herokuapp.com";
var IDS = [
  "shtraymel.co.il-main",
  "shtraymel.co.il-inside_post",
  "shtraymel.co.il-sidebar",
  "shtraymel.co.il-bottom",
  "shtraymel.co.il-under_hotpost",
  "shtraymel.co.il-single",
];

var currIds = /Android|webOS|iPhone|!tablet|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
)
  ? getMobileIDS(IDS)
  : IDS;
var ads_array = [];

requestAds();

function requestAds() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      insertAds(JSON.parse(xhr.response));
    }
  };
  xhr.open("GET", SERVER + "/bannersHandler/?banners=" + idsToString(currIds));
  xhr.send();
}

function insertAds(ads) {
  ads_array = ads;
  for (var i = 0; i < ads.length; i++) {
    var banner = document.getElementById(currIds[i]);
    if (banner !== null) {
      if (ads[i] !== "no_result") {
        banner.src = ads[i].url;
        banner.name = i;
      } else {
        if (elementHasClass(banner, "direct-ad")) {
          banner.className += " inactive";
        } else {
          banner.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
        }
      }
    }
  }
}

function idsToString(arr) {
  var str = "";
  for (var i = 0; i < arr.length; i++) {
    str += arr[i] + ",";
  }
  return str.substring(0, str.length - 1);
}

function onAdClicked(event, index) {
  var body = {
    campaign_id: ads_array[index].campaign_id,
    ad_id: ads_array[index].ad_id,
    action: "clicked",
    message: "banner got clicked",
    site: location.href,
    ad_position: event.currentTarget.id,
    ip: "ip",
    date: new Date(),
  };
  var xhr = new XMLHttpRequest();
  xhr.open("POST", SERVER + "/bannersHandler/click", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(body));

  window.open(ads_array[index].onclick, "_blank");
}

function elementHasClass(element, className) {
  return (" " + element.className + " ").indexOf(" " + className + " ") > -1;
}

function getMobileIDS(IDs_arr) {
  var mobiles = [];
  for (let i = 0; i < IDs_arr.length; i++) {
    mobiles[i] = IDs_arr[i] + "-m";
  }
  return mobiles;
}

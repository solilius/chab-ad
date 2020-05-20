var SERVER = "https://chab-ad.herokuapp.com";
var IDS = [
  "neshei.com-above_logo",
  "neshei.com-main_banner",
  "neshei.com-under_userbox",
  "neshei.com-chasut",
  "neshei.com-above_mostview",
  "neshei.com-under_mostview",
  "neshei.com-under_forum",
  "neshei.com-under_blogs",
  "neshei.com-under_medorim",
  "neshei.com-post_1",
  "neshei.com-post_2",
  "neshei.com-post_3",
  "neshei.com-post_4",
  "neshei.com-post_5",
  "neshei.com-post_6",
  "neshei.com-post_7",
  "neshei.com-post_8",
  "neshei.com-post_9",
  "neshei.com-post_10",
  "neshei.com-post_11",
  "neshei.com-post_12",
  "neshei.com-post_13",
  "neshei.com-post_14",
  "neshei.com-post_15",
  "neshei.com-post_16",
  "neshei.com-post_17",
  "neshei.com-post_18",
  "neshei.com-post_19",
  "neshei.com-post_20",
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

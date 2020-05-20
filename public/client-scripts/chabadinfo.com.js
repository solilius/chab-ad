var SERVER = "https://chab-ad.herokuapp.com";
var IDS = [
  "chabadinfo.com-between_posts_1",
  "chabadinfo.com-between_posts_2",
  "chabadinfo.com-between_posts_3",
  "chabadinfo.com-between_posts_4",
  "chabadinfo.com-between_posts_5",
  "chabadinfo.com-between_posts_6",
  "chabadinfo.com-between_posts_7",
  "chabadinfo.com-between_posts_8",
  "chabadinfo.com-between_posts_9",
  "chabadinfo.com-between_posts_10",
  "chabadinfo.com-between_posts_11",
  "chabadinfo.com-between_posts_12",
  "chabadinfo.com-between_posts_13",
  "chabadinfo.com-between_posts_14",
  "chabadinfo.com-between_posts_15",
  "chabadinfo.com-between_posts_16",
  "chabadinfo.com-between_posts_17",
  "chabadinfo.com-between_posts_18",
  "chabadinfo.com-between_posts_19",
  "chabadinfo.com-between_posts_20",
  "chabadinfo.com-between_posts_21",
  "chabadinfo.com-between_posts_22",
  "chabadinfo.com-between_posts_23",
  "chabadinfo.com-between_posts_24",
  "chabadinfo.com-between_posts_25",
  "chabadinfo.com-between_posts_26",
  "chabadinfo.com-between_posts_27",
  "chabadinfo.com-between_posts_28",
  "chabadinfo.com-between_posts_29",
  "chabadinfo.com-between_posts_30",
  "chabadinfo.com-top_above_logo",
  "chabadinfo.com-top_home_page",
  "chabadinfo.com-sidebar_top",
  "chabadinfo.com-sidebar_below_megazine",
  "chabadinfo.com-sidebar_below_opinions",
  "chabadinfo.com-sidebar_below_b.medrash",
  "chabadinfo.com-sidebar_below_e.pikcs",
  "chabadinfo.com-sidebar_below_hot_news",
  "chabadinfo.com-sidebar_below_video",
  "chabadinfo.com-under_classifieds",
  "chabadinfo.com-under_tehilim",
  "chabadinfo.com-under_event_calendar",
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

var SERVER = "https://chab-ad.herokuapp.com";
var IDS = [
  "chabad.info-top_banner",
  "chabad.info-golden_left",
  "chabad.info-single",
  "chabad.info-news_top",
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
  "chabad.info-post_36",
  "chabad.info-sidebar_magazine_1",
  "chabad.info-sidebar_magazine_2",
  "chabad.info-sidebar_magazine_3",
  "chabad.info-sidebar_above_video_1",
  "chabad.info-sidebar_above_video_2",
  "chabad.info-sidebar_above_video_3",
  "chabad.info-sidebar_under_hotnews_1",
  "chabad.info-sidebar_under_hotnews_2",
  "chabad.info-sidebar_under_hotnews_3",
  "chabad.info-sidebar_under_editor_1",
  "chabad.info-sidebar_under_editor_2",
  "chabad.info-sidebar_under_editor_3",
  "chabad.info-sidebar_under_masia_1",
  "chabad.info-sidebar_under_masia_2",
  "chabad.info-sidebar_under_masia_3",
  "chabad.info-sidebar_under_infomag_1",
  "chabad.info-sidebar_under_infomag_2",
  "chabad.info-sidebar_under_infomag_3",
  "chabad.info-sidebar_under_deot_1",
  "chabad.info-sidebar_under_deot_2",
  "chabad.info-sidebar_under_deot_3",
  "chabad.info-sidebar_test_1",
  "chabad.info-under_mag_widget",
  "chabad.info-midcol_under_buisindex_1",
  "chabad.info-midcol_under_buisindex_2",

  "chabad.info-home_under_main",
  "chabad.info-sidebar_under_video1",
  "chabad.info-sidebar_under_video2",
  "chabad.info-sidebar_under_video3",
  "chabad.info-midcol_under_eventsboard",
  "chabad.info-midcol_under_recsites",
  "chabad.info-midcol_under_tehilimwidg",
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
  xhr.onreadystatechange = function() {
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
    date: new Date()
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

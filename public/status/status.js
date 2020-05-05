var currPositions = {
  main: [],
  between: [],
  sidebar: [],
  middle: [],
};

$(document).ready(function () {
  getBannars("chabad.info");
});

$("select.site-selector").change(function () {
  $("#main").empty();
  $("#between").empty();
  $("#sidebar").empty();
  $("#middle").empty();
  getBannars($(this).children("option:selected").val());
});

function getBannars(site) {
  $.get(
    "/bannersHandler/status?banners=" +
      formatPositions(site, positions["main"][site]),
    function (data) {
      currPositions.main = data;
      loadPositions("main", site, data);
    }
  );
  $.get(
    "/bannersHandler/status?banners=" +
      formatPositions(site, positions["between"][site]),
    function (data) {
      currPositions.between = data;
      loadPositions("between", site, data);
    }
  );
  $.get(
    "/bannersHandler/status?banners=" +
      formatPositions(site, positions["sidebar"][site]),
    function (data) {
      currPositions.sidebar = data;
      loadPositions("sidebar", site, data);
    }
  );
  $.get(
    "/bannersHandler/status?banners=" +
      formatPositions(site, positions["middle"][site]),
    function (data) {
      currPositions.middle = data;
      loadPositions("middle", site, data);
    }
  );
}

function formatPositions(site, posArr) {
  var pos = [];
  for (var i = 0; i < posArr.length; i++) {
    pos.push(site + "-" + posArr[i]);
  }
  return pos;
}

function loadPositions(pos, site, posArr) {
  for (let i = 0; i < posArr.length; i++) {
    var isOccupied = posArr[i] !== "no_result";
    var myClass = isOccupied ? "occupied" : "free";
    var attributes = isOccupied
      ? ` data-toggle="modal" data-target="#myModal" onclick="openPositions('${pos}', ${i})"`
      : "";
    $("#" + pos).append(
      `<p ${attributes} class="position ${myClass}" > ${positions[pos][site][i]}</p>`
    );
  }
}

function openPositions(pos, index) {
  var posArr = currPositions[pos][index];
  var modal = "<div>";
  for (let i = 0; i < posArr.length; i++) {
    modal += `<div onclick="gotoCampaign(${posArr[i].campaign_id})" class="modal-item"><div style="margin-left:10px">${posArr[i].campaign_name}</div><img height="100px"src="${posArr[i].url}"></div>`;
  }
  modal += "</div>";
$("#modal-content").empty();
  $("#modal-content").append(modal);
}

function gotoCampaign(id){
    $(".modal-backdrop").css('display', 'none');
    localStorage.setItem("campaign",  id);
    goToPage('/CampaignPage/campaign_page.html');
}

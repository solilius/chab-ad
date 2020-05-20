validateActivity();

function composeCampaign() {
  return {
    campaign_id: (+new Date()).toString(),
    campaign_name: $("#campaign_name").val(),
    description: $("#description").val(),
    views: $("#views").val() === "" ? 2000000000 : $("#views").val(),
    clicks: $("#clicks").val() === "" ? 2000000000 : $("#clicks").val(),
    views_left:
      $("#views").val() === "" ? 2000000000 : parseInt($("#views").val()),
    clicks_left:
      $("#clicks").val() === "" ? 2000000000 : parseInt($("#clicks").val()),
    starting_date: getDate("starting_date"),
    expiration_date: getDate("expiration_date"),
    days: $("#days").val(),
    isActive: isActive(),
    client_info: {
      name: $("#client_name").val(),
      phone: $("#client_phone").val(),
      email: $("#client_email").val(),
      price: $("#client_price").val(),
      balance: $("#client_balance").val(),
      details: $("#client_details").val(),
    },
  };
}

function isActive() {
  return (
    new Date($("#starting_date").val()).getTime() <= new Date().getTime() &&
    new Date($("#expiration_date").val()).getTime() > new Date().getTime()
  );
}

function checkDate(addDays) {
  var date = new Date($("#starting_date").val() + "T00:00:00").getTime();
  var now = new Date().getTime();
  return date <= now && date + addDays * 86400000 >= now;
}

function getDate(date) {
  var dateTime = new Date($(`#${date}`).val()).getTime();
  var time =
    parseInt($(`#${date}_time`).val().split(":")[0]) * 3600000 +
    parseInt($(`#${date}_time`).val().split(":")[1]) * 60000;
  return new Date(dateTime + time).toISOString().substring(0, 19);
}

function composeBanners(campaign, isNew) {
  var banners = [];
  for (i in positions) {
    var tempBanner = {
      campaign_id: campaign.campaign_id,
      campaign_name: campaign.campaign_name,
      ad_id: campaign.campaign_id + "_" + $("#url-" + i).attr("src"),
      url: $("#url-" + i).attr("src"),
      onclick: $("#click-" + i).val(),
      size: $("#img-size-" + i).text(),
      starting_date: campaign.starting_date,
      expiration_date: campaign.expiration_date,
      positions: getPositions(i),
      isActive: campaign.isActive,
    };
    if (isNew) {
      tempBanner.clicks = 0;
      tempBanner.views = 0;
    }
    banners.push(tempBanner);
  }
  return banners;
}

function getPositions(bannerId) {
  var curPositions = [];
  for (let pos = 0; pos <= positions[bannerId]; pos++) {
    var site = $(`#site-select-${bannerId}-${pos}`).val();
    var position = $(`#pos-select-${bannerId}-${pos}`).val();
    var id = `${site}-${position}`;
    if (id !== "בחר אתר-בחר מיקום") {
      switch ($(`input[name=platform-${bannerId}-${pos}]:checked`).val()) {
        case "desktop":
          curPositions.push(id);
          break;
        case "mobile":
          curPositions.push(id + "-m");

          break;

        case "both":
          curPositions.push(id);
          curPositions.push(id + "-m");

          break;
      }
    }
  }

  return curPositions;
}

function validateActivity() {
  $("input").bind("change keyup", function () {
    if (isActive()) {
      $("#save-btn").addClass("btn-success").removeClass("btn-warning");
    } else {
      $("#save-btn").addClass("btn-warning").removeClass("btn-success");
    }
  });
}

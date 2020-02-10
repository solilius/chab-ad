var campaign_id = localStorage.getItem("campaign");
var campaign = {};

send("/campaigns/" + campaign_id, "GET", {headers: { Authorization: localStorage.getItem('token') }}, function(res) {
  campaign = res.data[0];
  insertValues();
});

send("/banners/" + campaign_id, "GET", {headers: { Authorization: localStorage.getItem('token') }}, function(res) {
  loadAds(res.data);
});

$('#expiration_date').on('change', function (){
    var days = (parseInt(new Date($('#expiration_date').val()).getTime()) -
                parseInt(new Date($('#starting_date').val()).getTime())) / 86400000
    $('#days').val(Math.round(days));
});

$('#days').on('change', function(){
    var expiration = parseInt(new Date($("#starting_date").val()).getTime()) + ($('#days').val() * 86400000);
    $('#expiration_date').val(new Date(expiration - tzoffset).toISOString().substr(0, 19));

});



function insertValues() {
  $("#campaign_name").val(campaign.campaign_name);
  $("#description").val(campaign.description);
  $("#views").val(campaign.views_left);
  $("#clicks").val(campaign.clicks_left);
  $("#starting_date").val(campaign.starting_date);
  $("#expiration_date").val(campaign.expiration_date);
  $("#days").val(campaign.days);
  $("#client_name").val(campaign.client_info.name);
  $("#client_phone").val(campaign.client_info.phone);
  $("#client_email").val(campaign.client_info.email);
  $("#client_price").val(campaign.client_info.price);
  $("#client_balance").val(campaign.client_info.balance);
  $("#client_details").val(campaign.client_info.details);
  if (!campaign.isActive) {
    $("#save-btn")
      .addClass("btn-warning")
      .removeClass("btn-success");
  }
}

function isDateValid(start, end) {
  return new Date(start).getTime() / 1000 <= new Date(end).getTime() / 1000;
}

function loadAds(banners) {
  for (var i = 0; i < banners.length; i++) {
    var data = {
      url: banners[i].url,
      width: banners[i].size.split("X")[0],
      height: banners[i].size.split("X")[1],
      ad_id: banners[i].ad_id,
      clicks: banners[i].clicks,
      views: banners[i].views
    };

    insertBanner(data, i);
    $("#click-" + i).val(banners[i].onclick);
    $("#img-size-" + i).val(banners[i].size);
    removePosition(i, 0);
    for (var p = 0; p < banners[i].positions.length; p++) {
      addPosition(i);
      var site = banners[i].positions[p].split("-")[0];
      var pos = banners[i].positions[p].split("-")[1];
      var platform =
        banners[i].positions[p].split("-")[2] == undefined
          ? "desktop"
          : "mobile";
      $("#site-select-" + i + "-" + p).val(site);
      siteSelected("site-select-" + i + "-" + p);
      $("#pos-select-" + i + "-" + p).val(pos);
      document.getElementById(
        "platform-" + i + "-" + p + "-both"
      ).checked = false;
      document.getElementById(
        "platform-" + i + "-" + p + "-" + platform
      ).checked = true;
    }
  }
}

function save() {
  deleteBanners();
  var my_campaign = composeCampaign();
  my_campaign.campaign_id = campaign.campaign_id;
  send("/campaigns/" + campaign_id, "PUT", my_campaign, function(res) {
    send(
      "/banners/",
      "PUT",
      { banners: composeBanners(my_campaign, false) },
      function(res) {
        swal("הקמפיין עודכן בהצלחה", "", "success");
      }
    );
  });
}

function send(url, method, body, callback) {
  axios({
    url: url,
    method: method,
    headers: { Authorization: localStorage.getItem('token') },
    data: body
  })
    .then(function(res) {
      callback(res);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function deleteBanners() {
  deleteBannersArray.forEach(bannerId => {
    axios({
      method: "delete",
      url: "/banners/",
      data: { id: bannerId },
      headers: { Authorization: localStorage.getItem('token') }
    });
  });
}

function deleteCampaign() {
  swal({
    title: "מחיקה",
    text: "האם אתה בטוח שברצונך למחוק את הקמפיין?",
    icon: "warning",
    buttons: true
  }).then(function(isOk) {
    if (isOk) {
      axios({
        method: "delete",
        url: "/campaigns/" + campaign_id,
        headers: { Authorization: localStorage.getItem('token') }
      })
        .then(function(response) {
          deleteAllBanners();
        })
        .catch(function(error) {
          swal("אראה שגיאה במהלך מחיקת הקמפיין", "", "error");
        });
    }
  });

  function deleteAllBanners() {
    axios({
      method: "delete",
      url: "/banners/campaign/" + campaign_id,
      headers: { Authorization: localStorage.getItem('token') }
    })
      .then(function(response) {
        swal("הקמפיין נמחק בהצלחה", "", "success").then(function() {
          goToPage("/CampaignsViewer/campaigns_viewer.html");
        });
      })
      .catch(function(error) {
        swal("אראה שגיאה במהלך מחיקת הבאנרים", "", "error");
      });
  }
}

function duplicate() {
  axios
    .get("campaigns/duplicate/" + campaign_id, { headers: { Authorization: localStorage.getItem('token') } })
    .then(function(res) {
      swal("הקמפיין שוכפל בהצלחה", "", "success")
        .then(function() {
          localStorage.setItem("campaign", res.data);
          goToPage("/CampaignPage/campaign_page.html");
        })
        .catch(function() {
          swal("אראה שגיאה במהלך שכפול הקמפיין ", "", "error");
        });
    });
}

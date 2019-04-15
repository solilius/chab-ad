function save() {
  swal({
    title: "שמירת קמפיין",
    text: "?האם ברצונך לשמור את הקמפיין ",
    icon: "warning",
    buttons: true
  }).then(isOk => {
    if (isOk) {
      var campaign = composeCampaign();
      var banners = composeBanners(campaign);
      upload(campaign, banners);
    }
  });
}

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
    starting_date: $("#starting_date").val(),
    expiration_date: getExpirationDate(),
    days: $("#days").val(),
    isActive: isActive(),
    client_info: {
      name: $("#client_name").val(),
      phone: $("#client_phone").val(),
      email: $("#client_email").val(),
      price: $("#client_price").val(),
      balance: $("#client_balance").val(),
      details: $("#client_details").val()
    }
  };
}

function isActive(){
    return (($('#starting_date').val() !== "") || checkDate()) &&
           (($('#days').val() !== "") || ($('#days').val() !== "0")) && 
           (($('#views').val() !== "") || ($('#views').val() !== "0")) && 
           (($('#clicks').val() !== "") || ($('#clicks').val() !== "0")) && 
}

function checkDate(){
    var date = new Date($('#starting_date').val()).getTime();
    var now = new Date().getTime();
    return (date <= now)
}

function composeBanners(campaign) {
  var banners = [];
  for (let i = 0; i < Object.keys(positions).length; i++) {
    if ($("#banner-" + i).val() !== undefined) {
      banners[i] = {
        campaign_id: campaign.campaign_id,
        campaign_name: campaign.campaign_name,
        ad_id: campaign.campaign_id + "_" + i,
        url: $("#url-" + i).attr("src"),
        onclick: $("#click-" + i).val(),
        size: $("#img-size-" + i).text(),
        starting_date: campaign.starting_date,
        expiration_date: campaign.expiration_date,
        clicks: 0,
        views: 0,
        positions: getPositions(i)
      };
    }
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

function getExpirationDate() {
  if (document.getElementById("starting_date").value != "") {
    var start = new Date(document.getElementById("starting_date").value);
    var days = parseInt(document.getElementById("days").value);

    return new Date(start.setDate(start.getDate() + days));
  }
  return "";
}

function upload(campaign, banners) {
  var header = { "auth": "1234" };
  axios.post("/campaigns", campaign, { headers: header }).then(function() {
      axios.post("/banners", { banners: banners }, { headers: header }).then(function() {
          swal("הקמפיין עלה בהצלחה", "", "success").then(function(){
            localStorage.setItem("campaign", campaign.campaign_id);
            goToPage('/CampaignPage/campaign_page.html');
          });
        }).catch(function(err) {
          swal("בעיה בהעלאת הבאנרים", "הקמפיין נוצר אבל הבאנרים לא הועלו", "error");
        });
    }).catch(function(err) {
      swal("העלאת הקמפיין נכשלה", err.message, "error");
    });
}
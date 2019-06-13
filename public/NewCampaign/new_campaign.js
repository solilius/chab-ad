
$('#starting_date').val(new Date().getFullYear() + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2));
$("input").bind("change keyup", function() {
  if (isActive()) {
    $("#save-btn")
      .addClass("btn-success")
      .removeClass("btn-danger");
  } else {
    $("#save-btn")
      .addClass("btn-danger")
      .removeClass("btn-success");
  }
});

function save() {
  swal({
    title: "שמירת קמפיין",
    text: "?האם ברצונך לשמור את הקמפיין ",
    icon: "warning",
    buttons: true
  }).then(isOk => {
    if (isOk) {
      var campaign = composeCampaign();
      var banners = composeBanners(campaign, true);
      upload(campaign, banners);
    }
  });
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


$("document").ready(function () {
  $("#starting_date").val(new Date().toISOString().substr(0, 10));
  $("#expiration_date").val(new Date().toISOString().substr(0, 10));
  $("#starting_date_time").val("00:01");
  $("#expiration_date_time").val("23:59");
});

$("#expiration_date").on("change", function () {
  var days =
    (parseInt(new Date($("#expiration_date").val()).getTime()) -
      parseInt(new Date($("#starting_date").val()).getTime())) /
    86400000;
  $("#days").val(Math.round(days));
});

$("#starting_date").on("change", function () {
  var days =
    (parseInt(new Date($("#expiration_date").val()).getTime()) -
      parseInt(new Date($("#starting_date").val()).getTime())) /
    86400000;
  $("#days").val(Math.round(days));
});

$("#days").on("change", function () {
  var expiration =
    parseInt(new Date($("#starting_date").val()).getTime()) +
    $("#days").val() * 86400000;
    $("#expiration_date").val(new Date(expiration).toISOString().substr(0, 10));

});

function save() {
  swal({
    title: "שמירת קמפיין",
    text: "?האם ברצונך לשמור את הקמפיין ",
    icon: "warning",
    buttons: true,
  }).then((isOk) => {
    if (isOk) {
      var campaign = composeCampaign();
      var banners = composeBanners(campaign, true);
      upload(campaign, banners);
    }
  });
}

function upload(campaign, banners) {
  var header = { Authorization: localStorage.getItem("token") };
  axios
    .post("/campaigns", campaign, { headers: header })
    .then(function () {
      axios
        .post("/banners", { banners: banners }, { headers: header })
        .then(function () {
          swal("הקמפיין עלה בהצלחה", "", "success").then(function () {
            localStorage.setItem("campaign", campaign.campaign_id);
            goToPage("/CampaignPage/campaign_page.html");
          });
        })
        .catch(function (err) {
          swal(
            "בעיה בהעלאת הבאנרים",
            "הקמפיין נוצר אבל הבאנרים לא הועלו",
            "error"
          );
        });
    })
    .catch(function (err) {
      swal("העלאת הקמפיין נכשלה", err.message, "error");
    });
}

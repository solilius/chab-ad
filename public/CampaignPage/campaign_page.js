var campaign_id = localStorage.getItem("campaign");
var campaign = {};
var ads = [];

send("/campaigns/" + campaign_id, "GET", {}, function(res) {
  campaign = res.data[0];
  insertValues();
});

send("/banners/" + campaign_id, "GET", {}, function(res) {
  ads = res.data;
  loadAds();
});

$("input").bind("change keyup", function() {
  if (isActive) {
    $("#save-btn")
      .addClass("btn-success")
      .removeClass("btn-danger");
  } else {
    $("#save-btn")
      .addClass("btn-danger")
      .removeClass("btn-success");
  }
});

function updateValue(id) {
  var url = "/campaigns/" + campaign_id;

  switch (id) {
    case "name":
      var val = document.getElementById(id).value;
      var body = { campaign_name: val };
      send(url + "/name", "PUT", body, function() {
        swal("שם הקמפיין עודכן", "", "success");
      });
      break;
    case "description":
      var val = document.getElementById(id).value;
      var body = { description: val };
      send(url, "PUT", body, function() {
        swal("תאור הקמפיין עודכן", "", "success");
      });
      break;
    case "count":
      var clicks = document.getElementById("clicks").value;
      var views = document.getElementById("views").value;

      var body = {
        clicks_left: parseInt(clicks) - campaign.clicks + campaign.clicks_left,
        clicks: parseInt(clicks),
        views_left: parseInt(views) - campaign.clicks + campaign.clicks_left,
        views: parseInt(views)
      };
      send(url + "/count", "PUT", body, function() {
        swal("המספר עודכן", "", "success");
      });
      break;
    case "date":
      var start = document.getElementById("start").value;
      var end = document.getElementById("end").value;
      if (isDateValid(start, end)) {
        var body = {
          starting_date: start + "T00:00:00.000Z",
          expiration_date: end + "T00:00:00.000Z"
        };
        send(url + "/date", "PUT", body, function() {
          swal("תאריך הקמפיין עודכן", "", "success");
        });
      } else {
        swal(
          "תאריך שגוי",
          "תאריך סיום הקמפיין לא יכול להיות קטן מתחילתו",
          "error"
        );
      }
      break;
  }
}

function updateClient() {
  var client = {
    name: document.getElementById("c_name").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    price: document.getElementById("price").value,
    balance: document.getElementById("balance").value,
    details: document.getElementById("details").value
  };

  send("/campaigns/" + campaign_id, "PUT", { client_info: client }, function(
    res
  ) {
    swal("פרטי הלקוח עודכנו בהצלחה", "", "success");
  });
}

function send(url, method, body, callback) {
  axios({
    url: url,
    method: method,
    headers: { auth: "1234" },
    data: body
  })
    .then(function(res) {
      callback(res);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function insertValues() {
  $("#campaign_name").val(campaign.campaign_name);
  $("#description").val(campaign.description);
  $("#views").val(campaign.views_left);
  $("#clicks").val(campaign.clicks_left);
  $("#starting_date").val(campaign.starting_date.split("T")[0]);
  $("#days").val(campaign.days);
  $("#client_name").val(campaign.client_info.name);
  $("#client_phone").val(campaign.client_info.phone);
  $("#client_email").val(campaign.client_info.email);
  $("#client_price").val(campaign.client_info.price);
  $("#client_balance").val(campaign.client_info.balance);
  $("#client_details").val(campaign.client_info.details);
  if (!campaign.isActive) {
    $("#save-btn")
      .addClass("btn-danger")
      .removeClass("btn-success");
  }
}

function isDateValid(start, end) {
  return new Date(start).getTime() / 1000 <= new Date(end).getTime() / 1000;
}

function isActive(){
    return (($('#starting_date').val() !== "") || checkDate()) &&
           (($('#days').val() !== "") || ($('#days').val() !== "0")) && 
           (($('#views').val() !== "") || ($('#views').val() !== "0")) && 
           (($('#clicks').val() !== "") || ($('#clicks').val() !== "0"))
}

function loadAds() {
  for (var i = 0; i < ads.length; i++) {}
}

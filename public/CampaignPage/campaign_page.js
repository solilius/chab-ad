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
  document.getElementById("status").checked = isActive();
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
  document.getElementById("name").value = campaign.campaign_name;
  document.getElementById("description").value = campaign.description;
  document.getElementById("views").value = campaign.views_left;
  document.getElementById("clicks").value = campaign.clicks_left;
  document.getElementById("start").value = campaign.starting_date.split("T")[0];
  document.getElementById("end").value = campaign.expiration_date.split("T")[0];
  document.getElementById("status").checked = campaign.isActive;

  document.getElementById("c_name").value = campaign.client_info.name;
  document.getElementById("phone").value = campaign.client_info.phone;
  document.getElementById("email").value = campaign.client_info.email;
  document.getElementById("price").value = campaign.client_info.price;
  document.getElementById("balance").value = campaign.client_info.balance;
  document.getElementById("details").value = campaign.client_info.details;
}

function isDateValid(start, end) {
  return new Date(start).getTime() / 1000 <= new Date(end).getTime() / 1000;
}

function isActive() {
  return (
    new Date(document.getElementById("start").value).getTime() / 1000 <=
      new Date().getTime() / 1000 &&
    new Date(document.getElementById("end").value).getTime() / 1000 >
      new Date().getTime() / 1000 &&
    parseInt(document.getElementById("clicks").value) > 0 &&
    parseInt(document.getElementById("views").value) > 0
  );
}

function loadAds() {
  for (var i = 0; i < ads.length; i++) {
      var pos = ads[i].positions.toString().replace(',', '<br>');
    $("#ads_list").append(
      `<div class="ad">
            <div class="col-md-8 ad-data">
               ${ads[i].onclick} <b> :לינק בלחיצה</b>  <br>
               ${ads[i].size} <b> :גודל</b> <br>
               ${ads[i].views} <b> :הופעות</b>  <br>
               ${ads[i].clicks} <b> :לחיצות</b>  <br>
                <b> :מיקומים</b>  <br>
                <div class="positions">${pos}</div>

            </div>
            <img  class="col-md-4" src="${ads[i].url}">
        </div>
        `
    );
  }
}

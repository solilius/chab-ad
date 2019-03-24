var index = 0;
window.ml = cloudinary.createMediaLibrary(
  {
    cloud_name: "dukdfuywh",
    api_key: "253593891576371",
    username: "solipod8@gmail.com",
    button_class: "btn btn-lg btn-info",
    button_caption: "בחר תמונה"
  },
  {
    insertHandler: function(data) {
      data.assets.forEach(asset => {
        insertBanner(asset, index++);
      });
    }
  },
  document.getElementById("add-banners")
);

function insertBanner(data, bannerId) {
  positions[bannerId] = 1;
  $("#banners").prepend(
    `<br><div id="banner-${bannerId}" class="row">
    <div class="col-md-offset-3 col-md-6 well">
      <button class="btn btn-danger btn-remove-banner" onclick="removeBanner('banner-${bannerId}')">X </button>
      <div class="img-preview-container">
        <img id="url-${bannerId}" src="${data.url}" class="img-preview"/>
        <div id="img-size-${bannerId}">${data.width}X${data.height}</div>
      </div>

      <div class="ad-info">
        <div class="input-group click-input">
          <input type="text" id="click-${bannerId}" class="form-control" aria-describedby="basic-addon2"/>
          <span class="input-group-addon" id="basic-addon2">בלחיצה</span>
        </div>
        <button id="add-pos" onclick="addPosition(${bannerId})" class="btn btn-info">
          הוסף מיקום</button ><br/>

        <div id="positions-${bannerId}">
          <div class="position" id="pos-${bannerId}-0">
            <div class="btn btn-danger" onclick="removePosition('pos-${bannerId}-0')">
              הסר
            </div>
            <div class="radio">
              <label class="checkbox-radio">
                <input type="radio" name="platform-${bannerId}-0" value="mobile"/>נייד</label>
              <label class="checkbox-radio"><input type="radio" name="platform-${bannerId}-0" value="pc" />נייח
              </label>
              <label class="checkbox-radio">
                  <input type="radio" name="platform-${bannerId}-0" checked value="both"/> שניהם
              </label>
            </div>
            <select class="form-control my-selector" id="pos-select-${bannerId}-0">
              <option hidden>בחר מיקום</option>
            </select>
            <select class="form-control my-selector" id="site-select-${bannerId}-0" onchange="siteSelected(event)">
              <option hidden>בחר אתר</option>
              <option>chabad.info</option>
              <option>chabadinfo.com</option>
              <option>neshei.com</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>`
  );
}

function removeBanner(id) {
  $("#" + id).remove();
}

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

function getExpirationDate() {
  if (document.getElementById("starting_date").value != "") {
    var start = new Date(document.getElementById("starting_date").value);
    var days = parseInt(document.getElementById("days").value);

    return new Date(start.setDate(start.getDate() + days));
  }
  return "";
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

function upload(campaign, banners) {
  var header = { "auth": "1234" };
  axios.post("/campaigns", campaign, { headers: header }).then(function() {
      axios.post("/banners", { banners: banners }, { headers: header }).then(function() {
          swal("הקמפיין עלה בהצלחה", "", "success");
        }).catch(function(err) {
          swal("בעיה בהעלאת הבאנרים", "הקמפיין נוצר אבל הבאנרים לא הועלו", "error");
        });
    }).catch(function(err) {
        console.log("qwe" + err);
      swal("העלאת הקמפיין נכשלה", err.message, "error");
    });
}
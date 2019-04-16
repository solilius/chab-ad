var index = 0;
var positions = {};

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
            <select class="form-control my-selector" id="site-select-${bannerId}-0" onchange="siteSelected('site-select-${bannerId}-0')">
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

function addPosition(id) {
  var position = positions[id]++;

  $("#positions-" + id).append(
    `<div class="position" id="pos-${id}-${position}">
            <div class="btn btn-danger remove-pos-btn" onclick="removePosition(${id},${position})">הסר</div>
            <div class="radio">
                <label class="checkbox-radio"><input type="radio" name="platform-${id}-${position}" id="platform-${id}-${position}-mobile" value="mobile">נייד</label>
                <label class="checkbox-radio"><input type="radio" name="platform-${id}-${position}" id="platform-${id}-${position}-desktop"  value="desktop">נייח</label>
                <label class="checkbox-radio"><input type="radio" name="platform-${id}-${position}" id="platform-${id}-${position}-both" checked value="both">שניהם</label>
            </div>
            <select class="form-control my-selector" id="pos-select-${id}-${position}">
                <option hidden>בחר מיקום</option>
            </select>
            <select class="form-control my-selector" id="site-select-${id}-${position}" onchange="siteSelected('site-select-${id}-${position}')">
                <option hidden>בחר אתר</option>
                <option>chabad.info</option>
                <option>chabadinfo.com</option>
                <option>neshei.com</option>
            </select>
        </div>`
  );
}

function removePosition(id, pos) {
  $(`#pos-${id}-${pos}`).remove();

  for (let index = pos + 1; index < positions[id]; index++) {
    $(`#pos-${id}-${index}`).attr("id", index - 1);
  }

  positions[id]--;
}

function siteSelected(siteId) {
  var id = siteId.split("site-select-")[1];
  switch (document.getElementById(siteId).value) {
    case "chabad.info":
      insertActions(id, chabadInfoPositions);

      break;
    case "chabadinfo.com":
      insertActions(id, chabadInfoComPositions);

      break;
    case "neshei.com":
      insertActions(id, nesheiPositions);

      break;
  }
}

function insertActions(id, positions) {
  var select = document.getElementById("pos-select-" + id);
  $("#pos-select-" + id).empty();
  for (let i = 0; i < positions.length; i++) {
    select.options[select.options.length] = new Option(positions[i]);
  }
}
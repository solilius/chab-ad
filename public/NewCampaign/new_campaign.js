var CLOUDINARY = "https://api.cloudinary.com/v1_1/dukdfuywh/upload";
var CLOUDINARY_UPLOAD_PRESET = "fxdiq2wt";

var chabadInfoPositions = ['qwe', 'asd'];
var chabadInfoComPositions = ['zxc', 'vbn'];
var nesheiPositions = ['123', '456'];

var ads = 1;

function picSelected() {
    var file = event.target.files[0];
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    axios({
        url: CLOUDINARY,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },

        data: formData
    }).then(function (res) {
        console.log();
        document.getElementById('img-size').innerHTML = res.data.height + 'X' + res.data.width;
        document.getElementById('img-preview').src = res.data.secure_url;

    }).catch(function (err) {
        console.log(err);
    })
}

function addPosition() {
    ads++;
    $("#ads").append(`<div class="position" id="pos-${ads}">
            <div class="radio">
                <label class="checkbox-radio"><input type="radio" name="platform-${ads}" id="both-${ads}">שניהם</label>
                <label class="checkbox-radio"><input type="radio" name="platform-${ads}" id="mobile-${ads}">נייד</label>
                <label class="checkbox-radio"><input type="radio" name="platform-${ads}" checked id="pc-${ads}">נייח</label>
            </div>
            <select class="form-control my-selector" id="pos-select-${ads}">
                <option hidden>בחר מיקום</option>
            </select>
            <select class="form-control my-selector" id="site-select-${ads}" onchange="siteSelected(event)">
                <option hidden>בחר אתר</option>
                <option>chabad.info</option>
                <option>chabadinfo.com</option>
                <option>neshei.com</option>
            </select>
        </div>`);
}

function removePosition() {
    ads--;
    $("#ads").children().last().remove();
}

function siteSelected(e) {
    var id = e.target.id.split('site-select-')[1];
    switch (document.getElementById(e.target.id).value) {
        case 'chabad.info':
            insertActions(id, chabadInfoPositions);

            break;
        case 'chabadinfo.com':
            insertActions(id, chabadInfoComPositions);

            break;
        case 'neshei.com':
            insertActions(id, nesheiPositions);

            break;
    }
}

function insertActions(id, positions) {
    var select = document.getElementById('pos-select-' + id);
    $('#pos-select-' + id).empty()
    for (let i = 0; i < positions.length; i++) {
        select.options[select.options.length] = new Option(positions[i]);
    }
}
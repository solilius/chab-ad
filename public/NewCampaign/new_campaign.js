var CLOUDINARY = "https://api.cloudinary.com/v1_1/dukdfuywh/upload";
var CLOUDINARY_UPLOAD_PRESET = "fxdiq2wt";

var chabadInfoPositions = [
    'music_right_top', 'music_left_top', 'top_banner', 'golden_left', 'single', 'video_side_280X395',
    'home_under_main_1290X200', 'news_top',
    'post-1', 'post-2', 'post-3', 'post-4', 'post-5', 'post-6', 'post-7', 'post-8', 'post-9', 'post-10',
    'post-11', 'post-12', 'post-13', 'post-14', 'post-15', 'post-16', 'post-17', 'post-18', 'post-19', 'post-20',
    'post-21', 'post-22', 'post-23', 'post-24', 'post-25', 'post-26', 'post-27', 'post-28', 'post-29', 'post-30',
    'post-31', 'post-32', 'post-33', 'post-34', 'post-35', 'post-36',
    'sidebar_magazine_1', 'sidebar_magazine_2', 'sidebar_magazine_3',
    'sidebar_above_video_1', 'sidebar_under_video_1', 'sidebar_under_video_2', 'sidebar_under_video_3',
    'sidebar_under_hotnews_1', 'sidebar_under_hotnews_2', 'sidebar_under_hotnews_3',
    'sidebar_under_editor_1', 'sidebar_under_editor_2', 'sidebar_under_editor_3',
    'sidebar_under_masia_1', 'sidebar_under_masia_2', 'sidebar_under_masia_3',
    'sidebar_under_infomag_1', 'sidebar_under_infomag_2', 'sidebar_under_infomag_3',
    'sidebar_under_deot_1', 'sidebar_under_deot_2', 'sidebar_under_deot_3',
    'single_600X300', 'under_mag_widget',
    'midcol_under_buisindex_1', 'midcol_under_buisindex_2',
    'midcol_under_eventboard', 'midcol_under_mazal', 'midcol_under_recsites', 'midcol_under_tehilimwidget', 'midcol_under_linkbuttons'
];
var chabadInfoComPositions = ['example-1', 'example-2'];
var nesheiPositions = ['example-3', 'example-4'];

var posArray = [];
var adArray = [];

var position = 1;
var ads = 0;

function picSelected() {
    var file = event.target.files[0];
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    post(CLOUDINARY, { 'Content-Type': 'application/x-www-form-urlencoded' }, formData, function (res) {
        document.getElementById('img-size').innerHTML = res.data.height + 'X' + res.data.width;
        document.getElementById('img-preview').src = res.data.secure_url;
    });
}

function addPosition() {
    position++;
    $("#positions").append(
        `<div class="position" id="pos-${position}">
            <div class="radio">
                <label class="checkbox-radio"><input type="radio" name="platform-${position}" value="both">שניהם</label>
                <label class="checkbox-radio"><input type="radio" name="platform-${position}" value="mobile">נייד</label>
                <label class="checkbox-radio"><input type="radio" name="platform-${position}" checked value="pc">נייח</label>
            </div>
            <select class="form-control my-selector" id="pos-select-${position}">
                <option hidden>בחר מיקום</option>
            </select>
            <select class="form-control my-selector" id="site-select-${position}" onchange="siteSelected(event)">
                <option hidden>בחר אתר</option>
                <option>chabad.info</option>
                <option>chabadinfo.com</option>
                <option>neshei.com</option>
            </select>
        </div>`);
}

function removePosition() {
    position--;
    $("#positions").children().last().remove();
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

function saveAd() {

    if (isAdValid()) {

        var src = document.getElementById('img-preview').src;
        var size = document.getElementById('img-size').innerHTML;
        $('#ads-preview-list').append(
            `<div class="ad-preview" id="ad-preview-${ads}">
            <img class="ad-preview-img" src="${src}">
            <div class="ad-preview-size">${size}</div>
            <button class="remove-ad" onclick="removeAd('ad-preview-${ads}')">X</button>
        </div>`
        );
        addPositionsToArray();
        addAdToArray();
        clearAdForm();
        ads++;
    }
}

function isAdValid() {

    if (document.getElementById('img-preview').src == 'http://fillmurray.com/g/300/300') {
        swal("חסרים נתונים", "לא טענת תמונה", "error");
        return false;

    } else if (document.getElementById('click').value == "") {
        swal("חסרים נתונים", "לא קיים נתיב בעת לחיצה על פרסומת", "error");
        return false;

    } else if (!isPositionsValid()) {
        swal("חסרים נתונים", "אחד או יותר מהמיקומים שהכנסת איננו תקין", "error");
        return false;

    } else if (document.getElementById('positions').children.length === 0) {
        swal("חסרים נתונים", "לא הוספו מיקומים", "error");
    }
    else {
        return true;
    }
}

function isPositionsValid() {

    for (let i = 1; i <= position; i++) {
        if (document.getElementById('site-select-' + i).value == "בחר אתר" ||
            document.getElementById('pos-select-' + i).value == "בחר מיקום") {
            return false;
        }

    }
    return true;
}

function addPositionsToArray() {
    for (let i = 1; i <= position; i++) {

        var site = document.getElementById('site-select-' + i).value;
        var pos = document.getElementById('pos-select-' + i).value;

        switch (document.querySelector(`input[name=platform-${i}]:checked`).value) {
            case 'pc':
                posArray.push(`${site}-${pos}`);
                break;
            case 'mobile':
                posArray.push(`${site}-${pos}-m`);

                break;

            case 'both':
                posArray.push(`${site}-${pos}`);
                posArray.push(`${site}-${pos}-m`);

                break;
        }
    }
}

function addAdToArray() {
    var ad = {
        positions: posArray,
        url: document.getElementById('img-preview').src,
        onclick: document.getElementById('click').value,
        size: document.getElementById('img-size').innerHTML,
    };
    adArray.push(ad);
    posArray = [];
}

function clearAdForm() {
    document.getElementById('img-size').innerHTML = "";
    document.getElementById('file-upload').value = "";
    document.getElementById('click').value = "";
    document.getElementById('img-preview').src = "/nopic.jpg";

    for (let i = 2; i <= position; i++) {
        document.getElementById('pos-' + i).remove();
    }
    position = 1;
}

function removeAd(id) {
    removeAdFromArray(id);
    document.getElementById(id).remove();
}

function removeAdFromArray(id) {
    adArray[id.split('ad-preview-')[1]] = null;
}

function save() {
    if (isCampaignValid()) {
        var campaign = {
            campaign_id: (+ new Date()).toString(),
            campaign_name: document.getElementById('campaign_id').value,
            description: document.getElementById('description').value,
            views: document.getElementById('views').value,
            clicks: document.getElementById('clicks').value,
            starting_date: document.getElementById('starting_date').value,
            expiration_date: document.getElementById('expiration_date').value,
            client_info: {
                name: document.getElementById('client_name').value,
                phone: document.getElementById('client_phone').value,
                email: document.getElementById('client_email').value,
                price: document.getElementById('client_price').value,
                balance: document.getElementById('client_balance').value,
                details: document.getElementById('client_details').value
            },
            views_left: document.getElementById('views').value,
            clicks_left: document.getElementById('clicks').value,
            isActive: true,
        }
        fillAdsArray(campaign);
    }
}

function fillAdsArray(campaign) {
    isEmpty = true;
    for (let i = 0; i < adArray.length; i++) {
        if (adArray[i] != null) {
            isEmpty = false;
            var data = getExtraData(adArray[i].positions);
            adArray[i].campaign_id = campaign.campaign_id;
            adArray[i].campaign_name = campaign.campaign_name;
            adArray[i].starting_date = campaign.starting_date,
                adArray[i].expiration_date = campaign.expiration_date,
                adArray[i].ad_id = campaign.campaign_id + i.toString();
            adArray[i].platform = data.platforms;
            adArray[i].sites = data.sites;
            adArray[i].positions_names = data.names;
            adArray[i].clicks = 0;
            adArray[i].views = 0;
            adArray[i].isActive = true;
        }
    }

    if (isEmpty) {
        swal({
            title: "אין פרסומות בקמפיין",
            text: "?האם ברצונך לשמור את הקמפיין כך",
            icon: "warning",
            buttons: true
        }).then((isOk) => {
            if (isOk) {
                var header = { "auth": "1234" };
                post('/campaigns', header, campaign, function (res) {
                    swal("DAMPAIGN", "You clicked the button!", "success", {
                        button: "Aww yiss!",
                    });
                });
                post('/banners', header, adArray, function (res) {
                    swal("ADS", "You clicked the button!", "success", {
                        button: "Aww yiss!",
                    });
                });
            }
        });
    } else {
        var header = { "auth": "1234" };
        post('/campaigns', header, campaign, function (res) {
            swal("CAMPAIGN", "You clicked the button!", "success", {
                button: "Aww yiss!",
            });
        });
        post('/banners', header, { "ads": adArray }, function (res) {
            swal("ADS", "You clicked the button!", "success", {
                button: "Aww yiss!",
            });
        });
    }
}


function post(url, headers, body, callback) {
    console.log(url);
    axios({
        url: url,
        method: 'POST',
        headers: headers,
        data: body
    }).then(function (res) {
        callback(res);

    }).catch(function (err) {
        console.log(err);
    })
}

function getExtraData(positions) {
    var platforms = [];
    var sites = [];
    var names = [];
    positions.forEach(function (pos) {
        sites.push(pos.split('-')[0]);
        names.push(pos.split('-')[1]);
        if (pos.split('-').length == 3) {
            platforms.push('נייד');
        } else {
            platforms.push('נייח');
        }
    });
    var uniquePlatforms = [];
    $.each(platforms, function (i, el) {
        if ($.inArray(el, uniquePlatforms) === -1) uniquePlatforms.push(el);
    });

    var uniqueSites = [];
    $.each(sites, function (i, el) {
        if ($.inArray(el, uniqueSites) === -1) uniqueSites.push(el);
    });

    var uniqueNames = [];
    $.each(names, function (i, el) {
        if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
    });

    return {
        platforms: uniquePlatforms,
        sites: uniqueSites,
        names: uniqueNames
    }
}

function isCampaignValid() {
    if (document.getElementById('campaign_id').value == "") {
        swal("חסרים נתונים", "מלא שם קמפיין", "error");
        return false;
    } else if (document.getElementById('description').value == "") {
        swal("חסרים נתונים", "מלא תאור קמפיין", "error");
        return false;
    } else if (document.getElementById('starting_date').value == "") {
        swal("חסרים נתונים", "מלא תאריך התחלת קמפיין", "error");
        return false;
    } else if (document.getElementById('expiration_date').value == "") {
        swal("חסרים נתונים", "מלא תאריך סיום קמפיין", "error");
        return false;
    } else if ((new Date(document.getElementById('expiration_date').value).getTime() / 1000) <=
        (new Date(document.getElementById('starting_date').value).getTime() / 1000)) {
        swal("טעות בזמנים", "תאריך סיום הקמפיין קטן מתאריך ההתחלה", "error");
        return false;
    } else if ((new Date(document.getElementById('expiration_date').value).getTime() / 1000) <=
        (new Date().getTime() / 1000)) {
        swal("טעות בזמנים", "תאריך סיום הקמפיין קטן מהיום ", "error");
        return false;
    } else if (document.getElementById('views').value <= 0) {
        swal("חסרים נתונים", "מלא מספר צפיות לקמפיין", "error");
        return false;
    } else if (document.getElementById('clicks').value <= 0) {
        swal("חסרים נתונים", "מלא מספר לחיצות לקמפיין", "error");
        return false;
    } else if (document.getElementById('client_name').value == "") {
        swal("חסרים נתונים", "מלא שם לקוח", "error");
        return false;
    } else if (document.getElementById('client_phone').value == "" &&
        document.getElementById('client_email').value == "") {
        swal("חסרים נתונים", "מלא טלפון או אימייל של הלקוח", "error");
        return false;
    } else if (document.getElementById('client_price').value < 0) {
        swal("חסרים נתונים", "מלא את מחיר הקמפיין", "error");
        return false;
    } else if (document.getElementById('client_balance').value < 0) {
        swal("חסרים נתונים", "מלא את יתרת תשלום הלקוח", "error");
        return false;
    } else {
        return true;
    }
}
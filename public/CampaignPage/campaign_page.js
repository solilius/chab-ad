var campaign_id = localStorage.getItem('campaign');
var campaign = {};
var ads = [];

send( '/campaigns/' + campaign_id, 'GET', {}, function (res) {
    campaign = res.data[0];
    insertValues();
});

function updateValue(id) {
    var url = '/campaigns/' + campaign_id;

    switch (id) {
        case 'name':
            var val = document.getElementById(id).value;
            var body = { "campaign_name": val };
            send(url + '/name', 'PUT', body, function () { swal("שם הקמפיין עודכן", "", "success") });
            break;
        case 'description':
            var val = document.getElementById(id).value;
            var body = { "description": val };
            send(url, 'PUT', body, function () { swal("תאור הקמפיין עודכן", "", "success") });
            break;
        case 'views':
            var val = document.getElementById(id).value;
            var body = {
                "views_left": (parseInt(val) - campaign.views) + campaign.views_left,
                "views": parseInt(val)
            };
            send(url, 'PUT', body, function () { swal("מספר הצפיות בקמפיין עודכן", "", "success") });
            break;
        case 'clicks':
            var val = document.getElementById(id).value;
            var body = {
                "clicks_left": (parseInt(val) - campaign.clicks) + campaign.clicks_left,
                "clicks": parseInt(val)
            };
            send(url, 'PUT', body, function () { swal("מספר הקליקים בקמפיין עודכן", "", "success") });
            break;
        case 'start':
            var val = document.getElementById(id).value;
            var body = { "starting_date": val };
            send(url + '/date', 'PUT', body, function () { swal("תאריך תחילת הקמפיין עודכן", "", "success") });
            break;
        case 'end':
            var val = document.getElementById(id).value;
            if (isDateValid()) {
                var body = { "expiration_date": val + "T00:00:00.000Z" };
                send(url, 'PUT', body, function () { swal("תאריך סיום הקמפיין עודכן", "", "success") });

            } else {
                swal("תאריך שגוי", "תאריך סיום הקמפיין לא יכול להיות קטן מתחילתו", "error")
            }
            break;
        case 'status':
            var val = document.getElementById(id).checked;
            var body = { "isActive": val };
            send(url, 'PUT', body, function () { swal("סטטוס הקמפיין עודכן", "", "success") });
            break;
        default:
            break;
    }
}

function updateClient() {
    var client = {
        name: document.getElementById('c_name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        price: document.getElementById('price').value,
        balance: document.getElementById('balance').value,
        details: document.getElementById('details').value,
    }

    send('/campaigns/' + campaign_id, 'PUT', {"client_info":client}, function(res){
         swal("פרטי הלקוח עודכנו בהצלחה", "", "success");
    });
}

function send(url, method, body, callback) {
    axios({
        url: url,
        method: method,
        headers: { "auth": "1234" },
        data: body
    }).then(function (res) {
        callback(res);
    }).catch(function (err) {
        console.log(err);
    })
}

function insertValues() {
    document.getElementById('name').value = campaign.campaign_name;
    document.getElementById('description').value = campaign.description;
    document.getElementById('views').value = campaign.views;
    document.getElementById('clicks').value = campaign.clicks;
    document.getElementById('start').value = campaign.starting_date;
    document.getElementById('end').value = campaign.expiration_date.split('T')[0];
    document.getElementById('status').checked = campaign.isActive;

    document.getElementById('c_name').value = campaign.client_info.name;
    document.getElementById('phone').value = campaign.client_info.phone;
    document.getElementById('email').value = campaign.client_info.email;
    document.getElementById('price').value = campaign.client_info.price;
    document.getElementById('balance').value = campaign.client_info.balance;
    document.getElementById('details').value = campaign.client_info.details;
}

function isDateValid() {
    return (new Date(document.getElementById('end').value).getTime() / 1000) >= (new Date(campaign.starting_date).getTime() / 1000)
}
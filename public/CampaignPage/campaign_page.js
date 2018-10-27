if(localStorage.getItem("campaign") != "none"){
    axios({
        url: '/campaigns/' + localStorage.getItem("campaign"),
        method: 'get',
        headers: {"auth": "1234"}
    }).then(function(data){
        console.log(data.data);
        if(data.data.length !== 0){
            document.getElementById('campaign_name').value = data.data[0].campaign_name;
            document.getElementById('description').value = data.data[0].description;
            document.getElementById('views').value = data.data[0].transaction_details.views;
            document.getElementById('clicks').value = data.data[0].transaction_details.clicks;
        }
    });
    localStorage.setItem("campaign", "none");
}

function save(){
    console.log('fuck u');
}

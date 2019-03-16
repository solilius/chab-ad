   window.ml = cloudinary.createMediaLibrary({
   cloud_name: 'dukdfuywh',
   api_key: '253593891576371',
   username: 'solipod8@gmail.com',
   button_class: 'btn btn-info gallery ',
   button_caption: 'גלריה',
 }, {
     insertHandler: function (data) {
       data.assets.forEach(asset => { console.log("Inserted asset:",
       JSON.stringify(asset, null, 2)) })
       }
    },
    document.getElementById("open-btn")
)

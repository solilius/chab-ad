$(document).ready(function() {
  $("a").on("click", function(e) {
    e.preventDefault();
    var ref = $(this).attr("href");
    goToPage(ref);
  });
  $("li").click(function() {
    $("li").removeClass("active");
    $(this).addClass("active");
  });

  goToPage("/BannersViewer/banners_viewer.html");
});

function goToPage(ref) {
  $.ajax({
    url: ref,
    type: "GET",
    dataType: "text",
    success: function(res) {
      $("#view").html(res);
    },
    error: function(err) {
      console.log("error: ", err);
    }
  });
}

localStorage.setItem("campaign", "none");

window.ml = cloudinary.createMediaLibrary(
  {
    cloud_name: "du91jnecw",
    api_key: "464382197244945",
    username: "chabad.info.img@gmail.com",
    button_class: "btn btn-info gallery ",
    button_caption: "גלריה"
  },
  {
    insertHandler: function(data) {
      data.assets.forEach(asset => {
        console.log("Inserted asset:", JSON.stringify(asset, null, 2));
      });
    }
  },
  document.getElementById("open-btn")
);

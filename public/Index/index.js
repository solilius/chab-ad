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
  goToPage("/Login/login.html");
});

function goToPage(ref) {
  var url = ref;
  if (localStorage.getItem("token") == null) {
      url = "/Login/login.html"
  }
  $.ajax({
    url: url,
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
    cloud_name: "chabbad",
    api_key: "863763734362528",
    username: "cha.badim.ages@gmail.com",
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

function logout(){
    localStorage.removeItem('token');
    goToPage("/Login/login.html");
}
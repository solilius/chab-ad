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

function logout(){
    localStorage.removeItem('token');
    goToPage("/Login/login.html");
}
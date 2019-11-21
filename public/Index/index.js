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
  if(ref != "/Login/login.html"){
    localStorage.setItem("current_page", ref);
  }
  if (localStorage.getItem("token") == null) {
    url = "/Login/login.html";
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

function logout() {
  localStorage.removeItem("token");
  goToPage("/Login/login.html");
}

$("#imageUpload").on("change", function(event) {
  var counter = 1;  
  var header = { Authorization: localStorage.getItem("token") };
  var files = event.target.files;
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var picReader = new FileReader();
    picReader.addEventListener("load", function(event) {
      var img = new Image();
      img.src = event.target.result;
      img.onload = function() {
        var w = this.width;
        var h = this.height;
        var body = {
          base64: event.target.result,
          dimensions: {
            width: w,
            height: h
          }
        };
        axios.put("/media", body, { headers: header }).then(function(data) {
            if (data.data == "uploaded") {
              swal(counter++ + "/" + files.length + " התמונה הועלת בהצלחה ", "", "success");  
            } else {
              swal("העלאת התמונה נכשלה", "", "error");
            }
          }).catch(function(err) {
            console.log(err);
            swal("העלאת התמונה נכשלה", "", "error");
          });
      };
    });
    picReader.readAsDataURL(file);
  }
});

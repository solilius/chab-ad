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

localStorage.setItem("campaign", "none");

function logout() {
  localStorage.removeItem("token");
  goToPage("/Login/login.html");
}

function readFile() {
  if (this.files && this.files[0]) {
    var FR = new FileReader();

    FR.addEventListener("load", function(e) {
      var header = { Authorization: localStorage.getItem("token") };
      var img = new Image();
      img.src = e.target.result;
      img.onload = function() {
        var w = this.width;
        var h = this.height;
        var body = {
          base64: e.target.result,
          width: w,
          height: h
        };
        axios.put("/media", body, { headers: header }).then(function(data) {
            if (data.data == "uploaded") {
              swal("התמונה הועלת בהצלחה", "", "success");
            } else {
              swal("העלאת התמונה נכשלה", "", "error");
            }
          }).catch(function(err) {
            console.log(err);
            swal("העלאת התמונה נכשלה", "", "error");
          });
      };
    });
    FR.readAsDataURL(this.files[0]);
  }
}

document.getElementById("imageUpload").addEventListener("change", readFile);

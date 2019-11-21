if (localStorage.getItem("token") != null) {
  if (localStorage.getItem("current_page") != null) {
    goToPage(localStorage.getItem("current_page"));
  } else {
    goToPage("/BannersViewer/banners_viewer.html");
  }
}

function login() {
  if ($("#username").val() == "" || $("#password").val() == "") {
    swal("חסרים פרטים", "אנא ודא שהכנסת משתמש וסיסמה", "warning");
  } else {
    axios({
      url: "/auth/login",
      method: "POST",
      data: { username: $("#username").val(), password: $("#password").val() }
    })
      .then(function (res) {
        if (res.data.includes("Bearer")) {
          localStorage.setItem("token", res.data);
          goToPage("/BannersViewer/banners_viewer.html");
        } else {
          swal("הגישה נדחתה", res.data, "error");
        }
      });
  }
}

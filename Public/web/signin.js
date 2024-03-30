$(document).ready(function () {
  $("#loginbtn").click(function () {
    let email = $("#txtEmail").val();

    let password = $("#logpass").val();
    console.log(email);
    let obj = {
      url: "/checkk-login-info",

      method: "POST",

      data: { email: email, password: password },
    };

    $.ajax(obj)

      .done(function (resp) {
        if (resp == "Customer") {
          localStorage.setItem("activeUser", email);
          location.href = "customer-Dash.html";
        } else if (resp == "Provider") {
          localStorage.setItem("activePRO", email);
          location.href = "vendor-dash.html";
        } else alert(resp);
      })

      .fail(function (err) {
        alert("Error=" + err);
      });
  });
});

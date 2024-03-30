
      $(document).ready(function () {
        
        

        $("#upbtn").click(function () {
          let email = $("#txttEmail").val();
          let password = $("#txtPass").val();
          let userType = $("select[name='utype']").val();

          let obj = {
            url: "/profile-save",
            method: "POST",
            data: { txttEmail: email, txtPwd: password, utype: userType },
          };

          $.ajax(obj)
            .done(function (resp) {
              $("#signerr").html(resp).addClass("ok").removeClass("not-ok");
            })
            .fail(function (err) {
              alert("Error=" + err);
            });
        });
      });
   
const express = require("express");
const app = express(); //it returns object
const fileuploader = require("express-fileupload");
const mysql2 = require("mysql2");

app.listen(3001, function () {
  console.log("Server Started at port :3001");
});

app.use(express.static("web"));

const congObj = {
  host: "127.0.0.1",
  user: "root",
  password: "Money@90410",
  database: "devcre",
 
};

const mysql = mysql2.createConnection(congObj);

mysql.connect(function (err) {
  if (err == null) console.log("connected to database");
  else console.log(err.message);
});

app.use(express.urlencoded({ extended: true }));
app.use(fileuploader());

app.get("/", function (req, resp) {
    let filePath = process.cwd() + "/web/first.html";
    resp.sendFile(filePath);
  });

  // -----------sign-up button --------------------

  app.post("/profile-save", function (req, resp) {
    // create table users (emailid varchar(30) primary key, pwd varchar(30) , usertype varchar(10) , dos date , status int );
    const email = req.body.txttEmail;
    const password = req.body.txtPwd;
    const usertype = req.body.utype;
    const status = 1;
  
    mysql.query(
      "insert into users values(?,?,?,current_date(),?)",
      [email, password, usertype, status],
      function (err) {
        if (err == null) {
          resp.send("Sign up successfully");
          
        } else resp.send(err.message);
      }
    );
  });


  // -----------login-button------------------------

  app.post("/checkk-login-info", function (req, resp) {
    const txtEmail = req.body.email;
  
    const logpass = req.body.password;
  
    mysql.query(
      "select * from users where emailid = ? and pwd = ?",
      [txtEmail, logpass],
      function (err, resultJsonAry) {
        if (err) {
          resp.send(err.message);
  
          return;
        }
  
        if (resultJsonAry.length == 1) {
          if (resultJsonAry[0].status == 1) {
            const userType = resultJsonAry[0].usertype;
            
  
            resp.send(userType);
          } else resp.send("Ur Account Is blocked !! Contact Admin");
        } else {
          resp.send("Invalid email or password");
        }
      }
    );
  });

  app.get("/cd", function (req, resp) {
    let filePath = process.cwd() + "/web/customer-Dash.html";
    resp.sendFile(filePath);
  });


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
  dateStrings: true,
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
//-----------customer dash-------------------------
app.get("/cd", function (req, resp) {
  let filePath = process.cwd() + "/web/customer-Dash.html";
  resp.sendFile(filePath);
});

app.get("/changepass", function (req, resp) {
  let email = req.query.email;
  let oldpass = req.query.oldpwd;
  let newpass = req.query.newpwd;

  mysql.query(
    "update users set pwd = ? WHERE emailid = ? and pwd = ?",
    [newpass, email, oldpass],
    function (err) {
      if (err) {
        resp.send("Error updating password");
      } else resp.send("Update successful");
    }
  );
});

// ----------------------------------------------------------
app.get("/cp", function (req, resp) {
  let filePath = process.cwd() + "/web/customer-profile.html";
  resp.sendFile(filePath);
});

app.post("/saveee", function (req, resp) {
  if (req.body.checkbox === "checked") {
    const namee = req.body.name;
    const contact = req.body.contact;
    const addr = req.body.address;
    const state = req.body.state;
    const city = req.body.city;

    const email = req.body.email;

    console.log(email);

    let filename;
    if (req.files == null) filename = "nopic.jpg";
    else {
      filename = req.files.ppic.name;
      let path = process.cwd() + "/web/pics/uploads/" + filename;
      req.files.ppic.mv(path);
    }

    req.body.ppic = filename;

    mysql.query(
      " insert into cuprofile values(?,?,?,?,?,?,?)",
      [email, namee, contact, addr, city, state, filename],
      function (err) {
        if (err == null) {
          console.log("Profile saved Successfully");

          resp.send("Profile saved Successfully");
        } else {
          console.log(err.message);
          resp.send("Error saving profile");
        }
      }
    );
  } else {
    console.log("please aggre to term&conditions");
    resp.send("Please agree to terms & conditions");
  }
});
app.post("/Sa", function (req, resp) {
  if (req.body.checkbox === "checked") {
    const namee = req.body.name;
    const contact = req.body.contact;
    const addr = req.body.address;
    const state = req.body.state;
    const city = req.body.city;
    const idproof = req.body.id;
    const textbox = req.body.txtar;
    const email = req.body.email;

    console.log(email);

    let filename;
    if (req.files == null) filename = "nopic.jpg";
    else {
      filename = req.files.ppic.name;
      let path = process.cwd() + "/web/pics/uploads/" + filename;
      req.files.ppic.mv(path);
    }

    req.body.ppic = filename;
    // create table vendorprofile(emailid varchar(30) primary key,FName varchar(40),contact varchar(15) , address varchar(100) ,  city varchar(30) , state varchar(50) ,idproof varchar(15),textbox varchar(600),ppic varchar(300) );
    // select * from cuprofile;
    mysql.query(
      " insert into vp  values(?,?,?,?,?,?,?,?,?)",
      [email, namee, contact, addr, city, state, idproof, textbox, filename],
      function (err) {
        if (err == null) {
          console.log("Profile saved Successfully");

          resp.send("Profile saved Successfully");
        } else {
          console.log(err.message);
          resp.send("Error saving profile");
        }
      }
    );
  } else {
    console.log("please aggre to term&conditions");
    resp.send("Please agree to terms & conditions");
  }
});

app.get("/search", function (req, resp) {
  const email = req.query.email;

  mysql.query(
    "select * from cuprofile where emailid=?",
    [email],
    function (err, ary) {
      console.log(ary);
      resp.send(ary);
    }
  );
});

app.post("/update", function (req, resp) {
  if (req.body.checkbox === "checked") {
    const namee = req.body.name;
    const contact = req.body.contact;
    const addr = req.body.address;
    const state = req.body.state;
    const city = req.body.city;

    const email = req.body.email;

    let filename;
    if (req.files && req.files.ppic) {
      // Check if req.files is not null or undefined, and if ppic property exists
      filename = req.files.ppic.name;
      let path = process.cwd() + "/web/pics/uploads/" + filename;
      req.files.ppic.mv(path);
    } else {
      // Handle case when req.files is null or undefined
      filename = req.body.hdn;
    }
    req.body.ppic = filename;

    mysql.query(
      " update cuprofile set Fname=? , contact=? , address=? , city=? , state=? , ppic=? where emailid=? ",
      [namee, contact, addr, city, state, filename, email],
      function (err) {
        if (err == null) {
          console.log("Profile updated Successfully");

          resp.send("Profile updated Successfully");
        } else {
          console.log(err.message);
          resp.send("Error updating profile");
        }
      }
    );
  } else {
    console.log("please aggre to term&conditions");
    resp.send("Please agree to terms & conditions");
  }
});

// -----------------------------------------------------------

app.get("/vd", function (req, resp) {
  let filePath = process.cwd() + "/web/vendor-dash.html";
  resp.sendFile(filePath);
});

app.get("/vp", function (req, resp) {
  let filePath = process.cwd() + "/web/vendor-profile.html";
  resp.sendFile(filePath);
});

app.get("/fsv", function (req, resp) {
  let filePath = process.cwd() + "/web/find-scrap-vendors.html";
  resp.sendFile(filePath);
});

app.get("/angular-fetch-allserviproviders", function (req, resp) {
  console.log("scdscds");
  mysql.query("SELECT * FROM vp", function (err, result) {
    if (err) {
      resp.send(err.message);
      console.log(err.message);
      return;
    } else {
      resp.send(result);
      console.log(result);
    }
  });
});

app.get("/mr", function (req, resp) {
  let filePath = process.cwd() + "/web/market-rates.html";
  resp.sendFile(filePath);
});

app.get("/request-pickup", function (req, resp) {
  var emailId = req.query.email;
  var au = req.query.au;
  console.log(emailId);
  console.log(au);

  // Specify the columns into which you want to insert the data
  mysql.query("INSERT INTO rp (emailid, fromemail) VALUES (?, ?)", [emailId, au], function (err, result) {
    if (err) {
      console.error("Error inserting data into rp table: " + err);
      resp.status(500).send("Error inserting data into rp table");
      return;
    }
    console.log("Data inserted into rp table successfully");
    resp.status(200).send("Request pickup initiated successfully");
  });
});


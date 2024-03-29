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
  database: "proje",
 
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
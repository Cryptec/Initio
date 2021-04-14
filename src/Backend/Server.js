// Create express app
var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require('md5')

const cors = require("cors");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Server port
var HTTP_PORT = 5000
// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT))
});
// Root endpoint
app.get("/", (req, res, next) => {
  res.json({ "message": "Ok" })
});
// Test
app.get('/ping', function (req, res) {
  return res.send('pong');
});
// Insert here other API endpoints
app.post("/api/user/", (req, res, next) => {
  var errors = []
  if (!req.body.regpassword) {
    errors.push("No password specified");
  }
  if (!req.body.regemail) {
    errors.push("No email specified");
  }
  if (errors.length) {
    res.status(400).json({ "error": errors.join(",") });
    return;
  }
  var data = {
    regname: req.body.regname,
    regemail: req.body.regemail,
    regpassword: md5(req.body.regpassword)
  }
  var sql = 'INSERT INTO user (regname, regemail, regpassword) VALUES (?,?,?)'
  var params = [data.regname, data.regemail, data.regpassword]
  db.run(sql, params, function (err, result) {
    if (err) {
      res.status(400).json({ "error": err.message })
      return;
    }
    res.json({
      "answer": "Success",
    })
  });
})


app.get("/api/users", (req, res, next) => {
  var sql = "select * from user"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "answer": "success",
      "data": rows
    })
  });
});

app.post("/login", function (req, res) {

  var name = req.body.regname;
  var password = req.body.regpassword;
  var sql = "SELECT * FROM user where (regname==?) AND (regpassword==?)"

  if (req.body.regname && req.body.regpassword) {
    console.log('Checking regname: ' + name + ' regpassword: ' + password);
    db.all(sql, function (err, rows) {

      if (err) {
        console.log('Error: ' + err);
      }
      else {
        rows.forEach(function (row) {
          console.log('Login Success')
          res.json({
            "answer": "Success",
          })

        });

      }
      console.log('Login Fail')
      res.json({
        "answer": "Success",
      })
    });

  }


});

app.get("/api/user/:id", (req, res, next) => {
  var sql = "select * from user where id = ?"
  var params = [req.params.id]
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.json({
      "answer": "success",
      "data": row
    })
  });
});
// Default response for any other request
app.use(function (req, res) {
  res.status(404);
});
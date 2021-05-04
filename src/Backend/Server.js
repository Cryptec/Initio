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
app.post("/api/bestand/", (req, res, next) => {
  var errors = []
  if (!req.body.Teilenummer) {
    errors.push("No Teilenummer specified");
  }
  if (!req.body.SKU) {
    errors.push("No SKU specified");
  }
  if (!req.body.Hersteller) {
    errors.push("No Hersteller specified");
  }
  if (!req.body.Preis) {
    errors.push("No Preis specified");
  }
  if (!req.body.Beschreibung) {
    errors.push("No Beschreibung specified");
  }
  if (errors.length) {
    res.status(400).json({ "error": errors.join(",") });
    return;
  }
  var data = {
    Teilenummer: req.body.Teilenummer,
    SKU: req.body.SKU,
    Hersteller: req.body.Hersteller,
    Preis: req.body.Preis,
    Beschreibung: req.body.Beschreibung,
  }
  var sql = 'INSERT INTO Teilebestand (Teilenummer, SKU, Hersteller, Preis, Beschreibung) VALUES (?,?,?,?,?)'
  var params = [data.Teilenummer, data.SKU, data.Hersteller, data.Preis, data.Beschreibung]
  
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


app.patch("/api/bestand/", (req, res, next) => {
  var reqBody = re.body;
  db.run(`UPDATE Teilebestand set Teilenummer = ?, SKU = ?, Hersteller = ?, Preis = ?, Beschreibung = ? WHERE Teilebestand_id = ?`,
      [reqBody.Teilenummer, reqBody.SKU, reqBody.Hersteller, reqBody.Preis, reqBody.Beschreibung, reqBody.Teilebestand_id],
      function (err, result) {
          if (err) {
              res.status(400).json({ "error": res.message })
              return;
          }
          res.status(200).json({ updatedID: this.changes });
      });
});
app.delete("/api/bestand/:id", (req, res, next) => {
  db.run(`DELETE FROM Teilebestand WHERE id = ?`,
      req.params.id,
      function (err, result) {
          if (err) {
              res.status(400).json({ "error": res.message })
              return;
          }
          res.status(200).json({ deletedID: this.changes })
      });
});


app.get("/api/bestand", (req, res, next) => {
  var sql = "select * from Teilebestand"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json(rows);
  });
});


app.get("/api/bestand/:id", (req, res, next) => {
  var sql = "select * from Teilebestand where id = ?"
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


//Users

app.post("/api/register/", (req, res, next) => {
  var errors=[]
  if (!req.body.regname){
    errors.push("No Username specified");
  }
  if (!req.body.regpassword){
      errors.push("No password specified");
  }
  if (!req.body.regemail){
      errors.push("No email specified");
  } 
  if (errors.length){
      res.status(400).json({"error":errors.join(",")});
      return;
  }
  var data = {
      regname: req.body.regname,
      regemail: req.body.regemail,
      regpassword : md5(req.body.regpassword)
  }
  var sql ='INSERT INTO Users (regname, regemail, regpassword) VALUES (?,?,?)'
  var params =[data.regname, data.regemail, data.regpassword]
  db.run(sql, params, function (err, result) {
      if (err){
          res.status(400).json({"error": err.message})
          return;
      }
      res.json({
          "answer": "Success",
      })
      res.status(200)
  });
})


app.get("/api/users", (req, res, next) => {
  var sql = "select * from Users"
  var params = []
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ "error": err.message });
      return;
    }
    res.status(200).json(rows);
  });
});

app.get("/api/users/:id", (req, res, next) => {
  var sql = "select * from Users where id = ?"
  var params = [req.params.id]
  db.get(sql, params, (err, row) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "answer":"success",
          "data":row
      })
    });
});

// Default response for any other request
app.use(function (req, res) {
  res.status(404);
});

app.post("/auth", function (req, res) {

  var name = req.body.regname;
  var password = req.body.regpassword;
  var sql = "SELECT * FROM Teilebestand where (regname==?) AND (regpassword==?)"

  if (req.body.regname && req.body.regpassword) {
    console.log('Checking regname: ' + name + ' regpassword: ' + password);
    db.all(sql, function (err, rows) {

      if (err) {
        console.log('Error: ' + err);
        res.json({
          "answer": "Denied",
        })
      }
      else {
        rows.forEach(function (row) {
          console.log('Login Success')
          res.json({
            "answer": "Success",
          })

        });
      }
    })}
})
      
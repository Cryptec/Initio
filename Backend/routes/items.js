const router = require('express').Router();
const multer = require('multer')
const fs = require('fs')
const checkAuthentication = require('../auth/is_authenticated');
var db = require('../Database');


const imagepath = './public/uploads/'

const upload = multer({
  dest: imagepath,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|PNG)$/)) {
      cb(new Error('Please upload an image.'))
    }
    cb(undefined, true)
  }
}).single("file");

router.post("/bestand/", checkAuthentication, upload, (req, res, next) => {
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
    console.log("Request ---", req.body);
    if (req.file !== undefined) {
    console.log("Request file ---", req.file);
    console.log("filename is:", req.file.Filename);
    var data = {
      Teilenummer: req.body.Teilenummer,
      SKU: req.body.SKU,
      Hersteller: req.body.Hersteller,
      Preis: req.body.Preis,
      Beschreibung: req.body.Beschreibung,
      Supply: req.body.Supply,
      filename: req.file.Filename
    }
    var sql = 'INSERT INTO Teilebestand (Teilenummer, SKU, Hersteller, Preis, Beschreibung, Supply, Filename) VALUES (?,?,?,?,?,?,?)'
    var params = [data.Teilenummer, data.SKU, data.Hersteller, data.Preis, data.Beschreibung, data.Supply, data.Filename]
    } else if (req.file === undefined) {
      var data = {
        Teilenummer: req.body.Teilenummer,
        SKU: req.body.SKU,
        Hersteller: req.body.Hersteller,
        Preis: req.body.Preis,
        Beschreibung: req.body.Beschreibung,
        Supply: req.body.Supply,
        Filename: "null"
      }
    var sql = 'INSERT INTO Teilebestand (Teilenummer, SKU, Hersteller, Preis, Beschreibung, Supply, Filename) VALUES (?,?,?,?,?,?,?)'
    var params = [data.Teilenummer, data.SKU, data.Hersteller, data.Preis, data.Beschreibung, data.Supply, data.Filename]
    }
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

  router.post("/edititem", checkAuthentication, upload, (req, res, next) => {
    console.log("Request ---", req.body);
    if (req.file !== undefined) {
    console.log("Request file ---", req.file);
    console.log("filename is:", req.file.Filename);
    var data = {
      id: req.body.id,
      Teilenummer: req.body.Teilenummer,
      SKU: req.body.SKU,
      Hersteller: req.body.Hersteller,
      Preis: req.body.Preis,
      Beschreibung: req.body.Beschreibung,
      Supply: req.body.Supply,
      Filename: req.file.Filename,
      Oldfilename: req.body.Oldfilename
    }
    const removeimagepath = imagepath + data.Oldfilename
    fs.unlink(removeimagepath, (err) => {
      if (err) {
        console.error(err)
        return
      }
      console.log("successfully deleted:" + data.Oldfilename)
    })
    var sql = 'UPDATE Teilebestand set Teilenummer = ?, SKU = ?, Hersteller = ?, Preis = ?, Beschreibung = ?, Supply = ?, Filename = ? WHERE id = ?'
    var params = [data.Teilenummer, data.SKU, data.Hersteller, data.Preis, data.Supply, data.Beschreibung, data.Filename, data.id]
    } else if (req.file === undefined) {
      var data = {
        id: req.body.id,
        Teilenummer: req.body.Teilenummer,
        SKU: req.body.SKU,
        Hersteller: req.body.Hersteller,
        Preis: req.body.Preis,
        Beschreibung: req.body.Beschreibung,
        Supply: req.body.Supply,
        Filename: req.file.Filename,
        Oldfilename: req.body.Oldfilename
      }
      var sql = 'UPDATE Teilebestand set Teilenummer = ?, SKU = ?, Hersteller = ?, Preis = ?, Beschreibung = ?, Supply = ? WHERE id = ?'
      var params = [data.Teilenummer, data.SKU, data.Hersteller, data.Preis, data.Supply, data.Beschreibung, data.id]
    }    
    db.run(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      console.log("Successfully edited data");
      return res.send({ success: true });
    });
  });

  router.delete("/bestand/:id", checkAuthentication, (req, res, next) => {
    var data = {
      Filename: req.body.filename,
      id: req.body.id
    }
    const removeimagepath = imagepath + data.Filename
    fs.unlink(removeimagepath, (err) => {
      if (err) {
        console.error(err)
        return
      }
      console.log("successfully deleted:" + data.Filename)
    })
    db.run(
      'DELETE FROM Teilebestand WHERE id = ?',
      req.params.id,
      function (err, result) {
        if (err) {
          res.status(400).json({ "error": res.message })
          return;
        }
        console.log("successfully deleted item")
        return res.send({ success: true });
      });
  });

  router.post('/removeimage', checkAuthentication, function (req, res) {
    var data = {
      Filename: req.body.Filename,
      Oldfilename: req.body.Oldfilename,
      id: req.body.id
    }
    const removeimagepath = imagepath + data.Oldfilename
    fs.unlink(removeimagepath, (err) => {
      if (err) {
        console.error(err)
        return
      }
      console.log("successfully deleted:" + data.Oldfilename)
    })
    var params = [data.filename, data.id]
    db.serialize(() => {
      db.run('UPDATE Teilebestand SET Filename = ? WHERE id = ?', params, function (err) {
        if (err) {
          res.send("Error encountered while updating");
          return res.status(400).json({ error: true });
        }
        console.log("Successfully removed image");
        return res.send({ success: true });
      });
    });
  });

  router.get("/bestand", checkAuthentication, (req, res, next) => {
    var sql = "select * from Teilebestand ORDER BY id DESC"
    var params = []
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ "error": err.message });
        return;
      }
      res.status(200).json(rows);
    });
  });

  router.get("/bestand/:id",checkAuthentication, (req, res, next) => {
    var sql = "select * from Teilebestand where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.status(200).json(row);
      });
  });

module.exports = router;
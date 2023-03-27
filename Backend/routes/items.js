const router = require('express').Router();
const checkAuthentication = require('../auth/is_authenticated');
var db = require('../Database');

router.post("/bestand/", checkAuthentication, (req, res, next) => {
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
      Supply: req.body.Supply
    }
    var sql = 'INSERT INTO Teilebestand (Teilenummer, SKU, Hersteller, Preis, Beschreibung, Supply) VALUES (?,?,?,?,?,?)'
    var params = [data.Teilenummer, data.SKU, data.Hersteller, data.Preis, data.Beschreibung, data.Supply]
    
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

  router.post("/edititem", checkAuthentication, (req, res, next) => {
    var data = {
      id: req.body.id,
      Teilenummer: req.body.Teilenummer,
      SKU: req.body.SKU,
      Hersteller: req.body.Hersteller,
      Preis: req.body.Preis,
      Beschreibung: req.body.Beschreibung,
      Supply: req.body.Supply
    }
    var sql = 'UPDATE Teilebestand set Teilenummer = ?, SKU = ?, Hersteller = ?, Preis = ?, Beschreibung = ?, Supply = ? WHERE id = ?'
    var params = [data.Teilenummer, data.SKU, data.Hersteller, data.Preis, data.Beschreibung, data.Supply, data.id]
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
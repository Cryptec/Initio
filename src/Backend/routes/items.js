const router = require('express').Router();
var db = require('../Database');

router.post("/bestand/", (req, res, next) => {
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

  router.patch("/bestand/", (req, res, next) => {
    var reqBody = req.body;
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
  router.delete("/bestand/:id", (req, res, next) => {
    var sql = "DELETE FROM Teilebestand WHERE id = ?"
    var params = [req.params.id]
    db.run (sql, params, (err) => {
            if (err) {
                res.status(400).json({ "error": res.message })
                return;
            }
            res.status(200).json({ deletedID: this.changes })
            res.json({
              "answer": "success"
            })
        });
  });

  router.get("/bestand", (req, res, next) => {
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
  
  
  router.get("/bestand/:id", (req, res, next) => {
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

module.exports = router;
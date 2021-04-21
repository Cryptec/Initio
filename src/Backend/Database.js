var sqlite3 = require('sqlite3').verbose()


const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE Teilebestand (
            Teilenummer text,  
            Hersteller text,
            Beschreibung text,  
            Preis text, 
            SKU text UNIQUE,
            CONSTRAINT SKU_unique UNIQUE (SKU)
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO Teilebestand (Teilenummer, Hersteller, Beschreibung, Preis, SKU) VALUES (?,?,?,?,?)'
                    db.run(insert, ["000000000", "Volkswagen", "Tacho Kombiinstrument", "19,95", "Z195"])

                }
            });
    }
});


module.exports = db
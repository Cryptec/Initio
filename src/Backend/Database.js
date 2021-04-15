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
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            Teilenummer text, 
            SKU text UNIQUE, 
            Hersteller text, 
            Price text, 
            Beschreibung text, 
            CONSTRAINT SKU_unique UNIQUE (SKU)
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, creating some rows
                    var insert = 'INSERT INTO Teilebestand (Teilenummer, SKU, Hersteller, Price, Beschreibung) VALUES (?,?,?,?,?)'
                    db.run(insert, ["000000000", "A3354", "Volkswagen", "19,95", "Tacho Kombiinstrument"])

                }
            });
    }
});


module.exports = db
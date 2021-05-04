var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')


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
                    var insertBestand = 'INSERT INTO Teilebestand (Teilenummer, Hersteller, Beschreibung, Preis, SKU) VALUES (?,?,?,?,?)'
                    db.run(insertBestand, ["000000000", "Volkswagen", "Tacho Kombiinstrument", "19,95", "Z195"])

        db.run(`CREATE TABLE Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            regname text, 
            regemail text UNIQUE, 
            regpassword text, 
            CONSTRAINT regemail_unique UNIQUE (regemail)
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, creating some rows
                    var insertUsers = 'INSERT INTO Users (regname, regemail, regpassword) VALUES (?,?,?)'
                    db.run(insertUsers, ["admin","admin@example.com",md5("admin123456")])
            
                    }
                });
                }
            });
    }
});


module.exports = db
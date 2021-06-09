var sqlite3 = require('sqlite3').verbose()
const bcrypt = require('bcryptjs')


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
            regname text UNIQUE, 
            regemail text UNIQUE, 
            regpassword text, 
            CONSTRAINT regemail_unique UNIQUE (regemail),
            CONSTRAINT regname_unique UNIQUE (regname)
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Hashing
                    var salt = bcrypt.genSaltSync(10);
                    var hashedPassword = bcrypt.hashSync("admin123456", salt);
                    // Table just created, creating some rows
                    var insertUsers = 'INSERT INTO Users (regname, regemail, regpassword) VALUES (?,?,?)'
                    db.run(insertUsers, ["admin","admin@example.com", hashedPassword])
            
                    }
                });
                }
            });
    }
});


module.exports = db
var sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text UNIQUE, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email),
            CONSTRAINT name_unique UNIQUE (name)
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    console.log("First start, Create Users Table!")
                }
            })

        db.run(`CREATE TABLE Teilebestand (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            Teilenummer text UNIQUE,  
            Hersteller text,
            Beschreibung text,  
            Preis text, 
            SKU text,
            CONSTRAINT Teilenummer_unique UNIQUE (Teilenummer)
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    console.log("First start, Create Parts Table!")
                }
            })
        
        db.run(`CREATE TABLE Settings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            currency text UNIQUE,
            theme text,
            registration text,
            CONSTRAINT currency_unique UNIQUE (currency)
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    var initialSettings = 'INSERT INTO Settings (currency, theme, registration) VALUES (?, ?, ?)'
                    db.run(initialSettings, "EUR", "default", "enabled")
                    console.log("First start, Create Settings Table!")
                }
            })
    }
});



module.exports = db
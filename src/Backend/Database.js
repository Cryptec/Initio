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
        db.run(`CREATE TABLE user (
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
                    var insert = 'INSERT INTO user (regname, regemail, regpassword) VALUES (?,?,?)'
                    db.run(insert, ["admin", "admin@example.com", md5("admin123456")])

                }
            });
    }
});


module.exports = db
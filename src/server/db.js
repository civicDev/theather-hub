
import sqlite3 from "sqlite3";
const db = new (sqlite3.verbose()).Database('db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function(err) {
    db.run(`
        CREATE TABLE IF NOT EXISTS events
        (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            description TEXT,
            location VARCHAR(255),
            city VARCHAR(255),
            band VARCHAR(255),
            banner VARCHAR(255),
            cast VARCHAR(510),
            duration DECIMAL(5,0),
            tickets VARCHAR(255),
            price DECIMAL(5,2),
            link VARCHAR(255),
            datetime DATETIME
        );
    `);

});

class DB {
    constructor() {
    }

    run(query, ...params) {
        return new Promise(function(resolve, reject) { 
            db.run(query, params, function(err) {
                if(err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    all(query, ...params) {
        return new Promise(function(resolve, reject) {
            db.all(query, params, function(err, rows) {
                if(err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}


export default DB;
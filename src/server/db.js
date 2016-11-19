
import sqlite3 from "sqlite3";
const db = new (sqlite3.verbose()).Database('db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function(err) {
    db.run(`
        CREATE TABLE IF NOT EXISTS shows
        (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            description TEXT,
            band VARCHAR(255),
            image VARCHAR(510),
            cast VARCHAR(510),
            duration DECIMAL(5,0),
            link VARCHAR(510)                                    
        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS events
        (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            show_id INT UNSIGNED,
            location VARCHAR(255),
            city VARCHAR(255),
            tickets VARCHAR(255),
            price DECIMAL(5,2),
            datetime DATETIME
        );
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS bands
        (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            type TINYINT,
            founded SMALLINT,
            city VARCHAR(255),
            link VARCHAR(510),
            description TEXT,
            email VARCHAR(255),
            telephone VARCHAR(255),
            website VARCHAR(510)
        )
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS band_members
        (
            id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            band_id INT UNSIGNED,
            name VARCHAR(255),
            link VARCHAR(510)
        )
    `)
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
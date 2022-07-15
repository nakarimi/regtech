// import connection
import db from "../config/database.js";

// Insert Metadata to Database
export const insertMetadata = (data, result) => {
    db.query("INSERT INTO metadata SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Getting all Metadata.
export const allMetadata = (result) => {
    db.query(`SELECT * FROM metadata`, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

// Getting single Metadata.
export const getMetadata = (id, result) => {
    db.query(`SELECT * FROM metadata where id=${id}`, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

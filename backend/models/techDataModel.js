// import connection
import db from "../config/database.js";

// Insert Techdata to Database
export const insertTechdata = (data, result) => {
    db.query("INSERT INTO technical_data SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

// Getting all Techdata.
export const allTechdata = (result) => {
    db.query(`SELECT * FROM technical_data`, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
};

// Getting single Techdata.
export const getTechdata = (id, result) => {
    db.query(`SELECT * FROM technical_data where id=${id}`, (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            console.log(results);

            result(null, results);
        }
    });
};

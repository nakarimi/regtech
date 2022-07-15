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

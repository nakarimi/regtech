// import connection
import db from "../config/database.js";
import { insertMetadata } from "../models/metadataModel.js";

// Insert data to Database based on the table name
export const insertData = (data, tb_name, result) => {
  db.query(`INSERT INTO ${tb_name} SET ?`, [data], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      console.log(results);

      result(null, results);
    }
  });
};

export const updateData = (data, id, tb_name, result) => {
  let queryValue = "";
  for (const [key, value] of Object.entries(data)) {
    queryValue += `${key}="${value}", `;
  }
  queryValue = queryValue.replace(/, $/, '');

  db.query(
    `UPDATE ${tb_name} SET ${queryValue} WHERE id = ${id}`,
    (err, results) => {
      if (err) {
        console.log(err);
        result(err, null);
      } else {
        result(null, results);
      }
    }
  );
};

// Get data from audits and create appropriate entity.
export const processApprovedData = (id, result) => {
  db.query("SELECT * FROM audits WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      result(err, null);
    } else {
      insertMetadata(results[0].new_values, result);
    }
  });
};

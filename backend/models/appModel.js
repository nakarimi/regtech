// import connection
import db from "../config/database.js";
import { insertMetadata } from "../models/metadataModel.js";
import moment from 'moment';

// Insert data to Database based on the table name
export const insertData = (data, tb_name, result) => {
  // Set the date based for create operation.
  data.created_at = new Date();

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

// Update operation based on table name.
export const updateData = (data, id, tb_name, result) => {
  // Set the date based for update operation.
  data.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');

  // Map the values and keys for the update query.
  let queryValue = "";
  for (const [key, value] of Object.entries(data)) {
    queryValue += `${key}="${value}", `;
  }
  // remove last comma from the mapped string for update query.
  queryValue = queryValue.replace(/, $/, "");

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

import db from "../config/database.js";
import { insertData, updateData } from "../models/appModel.js";

// Getting all audits that are not approved yet.
export const getAllPendingAudits = (req, res) => {
  db.query(
    `SELECT * FROM audits where status!='approved' order by created_at DESC`,
    (err, results) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json(results);
      }
    }
  );
};

// Fetching the audits history based on auditable id and type.
export const getAuditsHistory = (req, res) => {
  const auditable_id = req.params.auditable_id;
  const auditable_type = req.params.auditable_type;

  db.query(
    `SELECT * FROM audits where auditable_id=? and auditable_type=? order by created_at DESC`,
    [auditable_id, auditable_type],
    (err, results) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json(results);
      }
    }
  );
};

// Here the new values finded by the id of Audit and being applied to the main entity.
export const updateAudit = (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM audits where id=${id}`, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      //   First create or update the audits, so when it is approved the main record being created.
      if (results[0].event == "update") {
        updateData(
          JSON.parse(results[0].new_values),
          results[0].auditable_id,
          results[0].auditable_type,
          (err, results2) => {
            if (err) {
              res.send(err);
            } else {
              processAudit(results[0].id);
              res.json(results2);
            }
          }
        );
      } else {
        insertData(
          JSON.parse(results[0].new_values),
          results[0].auditable_type,
          (err, results2) => {
            if (err) {
              res.send(err);
            } else {
              processAudit(results[0].id, results2.insertId);
              res.json(results2);
            }
          }
        );
      }
    }
  });
};

// Update the audits when approved, so for the next time it would be ignored by flag approved.
export const processAudit = (id, auditable_id) => {
  var today = new Date();
  db.query(
    `UPDATE audits SET status = ?, review_date = ?, auditable_id = ? WHERE id = ?`,
    ["approved", today, auditable_id, id],
    (err, results) => {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
      }
    }
  );
};

// Update the audits when approved, so for the next time it would be ignored by flag approved.
export const rejectAudit = (req, res) => {
  let id = req.params.id;
  let today = new Date();
  db.query(
    `UPDATE audits SET status = ?, review_date = ? WHERE id = ?`,
    ["rejected", today, id],
    (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.json(results);
      }
    }
  );
};

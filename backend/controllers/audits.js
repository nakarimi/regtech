import db from "../config/database.js";
import { insertData } from "../models/appModel.js";

export const getAllPendingAudits = (req, res) => {
    db.query(`SELECT * FROM audits where status!='approved'`, (err, results) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.json(results);
        }
    });
};

export const updateAudit = (req, res) => {
    const id = req.params.id;
    db.query(`SELECT * FROM audits where id=${id}`, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            //   First create the audits, so when it is approved the main record being created.
            insertData(
                JSON.parse(results[0].new_values),
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
        }
    });
};

export const processAudit = (id) => {
    db.query(
        "UPDATE audits SET status = ? WHERE id = ?",
        ["approved", id],
        (err, results) => {
            if (err) {
                console.log(err);
            } else {
                console.log(results);
            }
        }
    );
};

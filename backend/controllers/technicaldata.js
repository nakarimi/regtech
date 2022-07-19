// Import function from Techdata Model
import { getTechdata, allTechdata } from "../models/techDataModel.js";
import { insertData } from "../models/appModel.js";

// Create New Techdata
export const createTechdata = (req, res) => {
  // Mapping the old and new values to store on the audits.
  const data = req.body;
  //   console.log(req.socket.remoteAddress);
  var old_values = {};
  var new_values = {};
  //   Check if the old and new values are not same and map the data.
  if (data.id) {
    if (data.old_role != data.role) {
      new_values.role = data.role;
      old_values.role = data.old_role;
    }
    if (data.old_permissions != data.permissions) {
      new_values.permissions = data.permissions;
      old_values.permissions = data.old_permissions;
    }
    if (data.old_app_id != data.app_id) {
      new_values.app_id = data.app_id;
      old_values.app_id = data.old_app_id;
    }
    var auditable_id = data.id;
  } else {
    new_values = {
      role: data.role,
      permissions: data.permissions,
      app_id: data.app_id,
    };
    var auditable_id = null;
  }

  // Mapping the audit data to be stored as pending that needs approval.
  if(Object.keys(new_values).length === 0){
    res.send("Fields not changed.");
  }else{
      let AuditData = {
        event: auditable_id ? "update" : "create",
        auditable_type: "technical_data",
        auditable_id: auditable_id,
        old_values: JSON.stringify(old_values),
        new_values: JSON.stringify(new_values),
        ip_address: req.ip,
        user_agent: req.headers["user-agent"],
      };
      
      // First create the audits, so when it is approved the main record being created.
      // Before Create New Techdata, the audits being created that needs approval to affect the system.
      insertData(AuditData, "audits", (err, results) => {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.json(results);
        }
      });
  }
};

// Getting all Techdata.
export const showTechdata = (req, res) => {
  allTechdata((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Getting the Techdata.
export const getSingleTechdata = (req, res) => {
  const id = req.params.id;
  console.log(id);
  getTechdata(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

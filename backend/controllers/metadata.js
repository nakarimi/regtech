// Import function from Metadata Model
import { getMetadata, allMetadata } from "../models/metadataModel.js";
import { insertData } from "../models/appModel.js";

// Create New Metadata
export const createMetadata = (req, res) => {
  // Mapping the old and new values to store on the audits.
  const data = req.body;
  //   console.log(req.socket.remoteAddress);
  var old_values = {};
  var new_values = {};
  //   Check if the old and new values are not same and map the data.
  if (data.id) {
    if (data.old_name != data.name) {
      new_values.name = data.name;
      old_values.name = data.old_name;
    }
    if (data.old_owner != data.owner) {
      new_values.owner = data.owner;
      old_values.owner = data.old_owner;
    }
    if (data.old_manager != data.manager) {
      new_values.manager = data.manager;
      old_values.manager = data.old_manager;
    }
    var auditable_id = data.id;
  } else {
    new_values = {
      name: data.name,
      owner: data.owner,
      manager: data.manager,
    };
    var auditable_id = null;
  }

  // Mapping the audit data to be stored as pending that needs approval.
  let AuditData = {
    event: old_values ? "update" : "create",
    auditable_type: "metadata",
    auditable_id: auditable_id,
    old_values: JSON.stringify(old_values),
    new_values: JSON.stringify(new_values),
    ip_address: req.ip,
    user_agent: req.headers["user-agent"],
  };

  // First create the audits, so when it is approved the main record being created.
  // Before Create New Metadata, the audits being created that needs approval to affect the system.
  insertData(AuditData, "audits", (err, results) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Getting all Metadata.
export const showMetadata = (req, res) => {
  allMetadata((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Getting the Metadata.
export const getSingleMetadata = (req, res) => {
  const id = req.params.id;
  getMetadata(id, (err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};

// Import function from Metadata Model
import { insertMetadata} from "../models/metadataModel.js";
import { insertData } from "../models/appModel.js";

// Create New Metadata
export const createMetadata = (req, res) => {
    const data = req.body;
    let AuditData = {
        event: 'create',
        auditable_type: 'metadata',
        auditable_id: null,
        old_values: null,
        new_values: JSON.stringify(data),
        ip_address: '127.0.0.1',
        user_agent: 'chrome',
      };
    
    // First create the audits, so when it is approved the main record being created.
    // Before Create New Metadata, the audits being created that needs approval to affect the system.
    insertData(AuditData, 'audits', (err, results) => {
        if (err){
            console.log(err);
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
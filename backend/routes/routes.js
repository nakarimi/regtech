// import express
import express from "express";

// import function from controller
import { createMetadata } from "../controllers/metadata.js";
import { getAllPendingAudits, updateAudit } from "../controllers/audits.js";

// init express router
const router = express.Router();

// Get All Metadata
router.get('/get/all/pending/audits', getAllPendingAudits);

// Create New Metadata
router.post('/metadata', createMetadata);

// Update Metadata
router.put('/approve/audit/:id', updateAudit);

// export default router
export default router;
// import express
import express from "express";

// import function from controller
import { createMetadata, showMetadata, getSingleMetadata } from "../controllers/metadata.js";
import { getAllPendingAudits, updateAudit } from "../controllers/audits.js";

// init express router
const router = express.Router();

// Get All Audits
router.get('/get/all/pending/audits', getAllPendingAudits);

// Get All Metadata
router.get('/get/all/metadata', showMetadata);

// Get Metadata
router.get('/get/metadata/:id', getSingleMetadata);

// Create New Metadata
router.post('/metadata', createMetadata);

// Update Metadata
router.put('/approve/audit/:id', updateAudit);

// export default router
export default router;
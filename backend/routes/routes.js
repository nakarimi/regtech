// import express
import express from "express";

// import function from controller
import { createMetadata, showMetadata, getSingleMetadata } from "../controllers/metadata.js";
import { createTechdata, showTechdata, getSingleTechdata } from "../controllers/technicaldata.js";
import { getAllPendingAudits, updateAudit, getAuditsHistory, rejectAudit } from "../controllers/audits.js";

// init express router
const router = express.Router();

// Get All Audits
router.get('/get/all/pending/audits', getAllPendingAudits);
router.get('/get/audits/history/:auditable_type/:auditable_id', getAuditsHistory);

// Get All Metadata
router.get('/get/all/metadata', showMetadata);

// Get All technical data
router.get('/get/all/techdata', showTechdata);

// Get Metadata
router.get('/get/metadata/:id', getSingleMetadata);

// Get technical data
router.get('/get/techdata/:id', getSingleTechdata);

// Create New Metadata
router.post('/metadata', createMetadata);

// Create New technical data
router.post('/techdata', createTechdata);

// Aoorove pending audits.
router.put('/approve/audit/:id', updateAudit);

// reject pending audits.
router.put('/reject/audit/:id', rejectAudit);

// export default router
export default router;
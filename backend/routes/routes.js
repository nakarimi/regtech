// import express
import express from "express";

// import function from controller
import { createMetadata, showMetadata, getSingleMetadata } from "../controllers/metadata.js";
import { createTechdata, showTechdata, getSingleTechdata } from "../controllers/technicaldata.js";
import { getAllPendingAudits, updateAudit } from "../controllers/audits.js";

// init express router
const router = express.Router();

// Get All Audits
router.get('/get/all/pending/audits', getAllPendingAudits);

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

// export default router
export default router;
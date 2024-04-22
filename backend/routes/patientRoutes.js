const express = require('express');
const { fetchVaccines, moreInfo, createPdf, fetchPdf } = require('../controllers/patientControllers');
const router = express.Router();

router.route("/patient/:aadhaar").get(fetchVaccines);
router.route("/patient/moreinfo/:id").get(moreInfo);
router.route("/create-pdf").post(createPdf);
router.route("/fetch-pdf").get(fetchPdf);

module.exports = router;
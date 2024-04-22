const express = require('express');
const { getVaccines, getPatientInfo, getVaccinationInfo } = require('../controllers/inspectorControllers');
const router = express.Router();

router.route('/inspector/vaccines').get(getVaccines);
router.route('/inspector/getpatientinfo/:aadhaar').get(getPatientInfo);
router.route('/inspector/:aadhaar').get(getVaccinationInfo);

module.exports = router;
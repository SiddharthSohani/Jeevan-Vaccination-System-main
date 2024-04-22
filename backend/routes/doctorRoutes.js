const express = require('express');
const { searchPatient, getVaccines, getVaccinated, addVaccine, getSingleVaccine, editVaccine, deleteVaccine } = require('../controllers/doctorControllers');
const router = express.Router();

router.route('/doctor/getpatientinfo/:aadhaar').get(searchPatient);
router.route('/doctor/vaccinate/:aadhaar').get(searchPatient);
router.route('/doctor/vaccinate').post(getVaccinated);
router.route('/doctor/getvaccines').get(getVaccines);
router.route('/doctor/addvaccine').post(addVaccine);
router.route('/doctor/getvaccine/:id').get(getSingleVaccine);
router.route('/doctor/editvaccine/:id').put(editVaccine);
router.route('/doctor/deletevaccine/:id').delete(deleteVaccine);

module.exports = router;
const express = require('express');
const { checkAadhaar, registerUser, loginFirst, authUser, editprofile, editCredentials , userExists, deleteProfile, forgetPassword, forgetSecretCode } = require('../controllers/userControllers');
const router = express.Router();

router.route('/register/checkaadhaar').post(checkAadhaar);
router.route('/register').post(registerUser);
router.route('/login/first').post(loginFirst);
router.route('/login').post(authUser);
router.route('/editprofile').put(editprofile);
router.route('/editcredentials').post(editCredentials);
router.route('/deleteprofile/:aadhaar').get(userExists);
router.route('/deleteprofile').post(deleteProfile);
router.route('/forgetpassword').post(forgetPassword);
router.route('/forgetsecretcode').post(forgetSecretCode);

module.exports = router;
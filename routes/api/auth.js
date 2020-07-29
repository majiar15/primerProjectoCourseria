const express = require('express');
const router = express.Router();

const authController = require('../../controllers/api/authControllerApi');
const passport = require('passport');


router.post('/autenticate',authController.autenticate);
router.post('/forgotPassword',authController.forgotPassword);
router.post('/facebook_token',passport.authenticate('facebook-token'),authController.authFacebookToken)

module.exports = router;
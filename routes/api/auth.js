const express = require('express');
const router = express.Router();

const authController = require('../../controllers/api/authControllerApi');


router.post('/autenticate',authController.autenticate);
router.post('/forgotPassword',authController.forgotPassword);
// router.post('/autenticate',authController.autenticate);
// router.post('/forgotPassword',authController.forgotPassword);


module.exports = router;
let express = require('express')
let router = express.Router();
let tokenController = require('../controllers/tokenController');

router.get('/confirmation/:token', tokenController.confirmationGet);

module.exports = router;

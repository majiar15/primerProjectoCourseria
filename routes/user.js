var express = require('express');
var router = express.Router();
let userController = require('../controllers/usuarioController');
/* GET users listing. */
router.get('/',userController.list);
router.get('/create',userController.create_get);
router.get('/:id/update',userController.update_get);

router.post('/create',userController.create);
router.post('/:id/update',userController.update);
router.post('/:id/delete',userController.delete);

module.exports = router;

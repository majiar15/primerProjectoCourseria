let express = require('express');
let router = express.Router();

let usuarioController = require('../../controllers/api/usuarioControllerApi');

router.get('/', usuarioController.usuario_list);
router.post('/create', usuarioController.usuario_create);
router.post('/reservar', usuarioController.usuario_reservar);


module.exports = router;
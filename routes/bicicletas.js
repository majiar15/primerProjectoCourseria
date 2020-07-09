let express = require('express');
let router = express.Router();
let BicicletaController = require('../controllers/bicicletaController');

router.get('/', BicicletaController.Bicicleta_list);
router.get('/create', BicicletaController.bicicleta_create_get);
router.get('/:id/update', BicicletaController.bicicleta_update_get);
router.post('/create', BicicletaController.bicicleta_create_post);
router.post('/:id/delete', BicicletaController.bicicleta_delete_post);
router.post('/:id/update', BicicletaController.bicicleta_update_post);

module.exports = router;
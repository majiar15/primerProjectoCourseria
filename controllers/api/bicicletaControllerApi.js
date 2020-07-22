let Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function(req, res) {
    res.status(200).json({
        bicicleta: Bicicleta.allbicis
    });
}

exports.bicicleta_create = function(req, res) {
    let id = req.body.id;
    let color = req.body.color;
    let modelo = req.body.modelo;
    let ubicacion = [req.body.lat, req.body.lng];
    // console.log(id);
    // console.log(color);
    // console.log(modelo);
    // console.log(ubicacion);    
    let bici = new Bicicleta(id,color,modelo,ubicacion);
    
    console.log(bici);
    Bicicleta.add(bici);
    res.status(200).json({
        bicicleta: bici
    })
}
exports.bicicleta_update = function(req, res) {
    let bici = Bicicleta.findById(req.body.id);
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = req.body.ubicacion;

    res.status(200).json({
        bicicleta: bici
    })
}
exports.bicicleta_delete = function(req, res) {
    console.log(req.body.id);
    Bicicleta.removeById(req.body.id);
    res.status(204).send();
}
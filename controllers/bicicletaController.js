let Bicicleta = require('../models/bicicleta');
exports.Bicicleta_list = function(req, res) {
    Bicicleta.allBicis(function(err,bicis) {
        res.render('bicicletas/index', { bicis: bicis });    
    })
    
}
exports.bicicleta_create_get = function(req, res) {
    res.render('bicicletas/create');
}
exports.bicicleta_create_post = function(req, res) {
    let code = req.body.code;
    let color = req.body.color;
    let modelo = req.body.modelo;
    
    let bici = new Bicicleta({code,color,modelo});
    bici.ubicacion = [req.body.lat, req.body.lng];
    Bicicleta.add(bici,(err,bicicleta)=>{
        if(err) console.log(err);  
        
    });

    res.redirect('/bicicletas');
}

exports.bicicleta_update_get = function(req, res) {
    console.log('object');
    Bicicleta.findByCode(req.params.id,function(err,bici) {
        res.render('bicicletas/update', { bici });    
    });
    
}
exports.bicicleta_update_post = function(req, res) {
    Bicicleta.findByCode(req.params.id,function(err,bici) {
       
    bici._id = req.body.id;
    bici.color = req.body.color;
    bici.modelo = req.body.modelo;
    bici.ubicacion = [req.body.lat, req.body.lng];
    bici.save();
    res.redirect('/bicicletas'); 
    });
}
exports.bicicleta_delete_post = function(req, res) {
    Bicicleta.removeByCode(req.body.id,function(err,biciDelete) {
        if(err) console.log(err);
    });
    res.redirect('/bicicletas');
}
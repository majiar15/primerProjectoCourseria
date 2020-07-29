let Usuario = require('../../models/usuario');


exports.usuario_list = function(req,res) {
    Usuario.find({},function(err,usuarios) {
        res.status(200).json({
            usuarios:usuarios
        });
    });
}
exports.usuario_create = function(req,res) {
    if (req.body.password != req.body.confirm_password) {
        res.status(400).send('las contraseñas no coinciden');
    } else {
        Usuario.create({nombre: req.body.nombre, email: req.body.email, password: req.body.password }, function(err, newUser) {
            if (err) {
                res.status(400).send('error al guardar el usuario')

            } else {
                res.status(200).json({
                    ususario: newUser
                })
            }
        });
    }    

}

exports.usuario_reservar = function(req,res) {
    Usuario.findById(req.body.id, function(err,usuario) {
        console.log(usuario);
        usuario.reservar(req.body.bici_id, req.body.desde, req.body.hasta,function(err){
            console.log('reserva!!');
            res.status(200).send();
        });
    });
}
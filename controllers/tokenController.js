let Usuario = require('../models/usuario');
let token = require('../models/token');

module.exports = {
    confirmationGet:function(req,res,next) {
        token.findOne({token : req.params.token}, function(err, token)   {
            if(!token) return res.status(400).send({type: 'no-verified', msg: "no encontramos ningun usuario con ese token quisas haya expirado, solicite uno nuevo"});
            Usuario.findById(token._userId, function(err, user) {
                if(!user) return res.status(400).send({msg: "no encontramos un usuario con este token"});
                if(user.verificado) return res.redirect('/usuarios');
                user.verificado = true;
                user.save(function(err) {
                    if(err) return res.status(500).send({msg: err.message});
                    res.redirect('/');
                })
            })
        });
    }
}
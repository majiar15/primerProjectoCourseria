let  Usuario = require('../models/usuario');
const { update } = require('../models/usuario');
const usuario = require('../models/usuario');

module.exports = {
    list: function(req,res,next) {
        Usuario.find({},function(err,user) {
            if (err) {
                return console.log(err);
            }else{
                console.log(user);
                res.render('usuarios/index',{usuarios: user});    
            }
        });
    },
    update_get:function(req,res,next) {
      Usuario.findById(req.params.id,function(err,user) {
          
          res.render('usuarios/update',{errors:{},usuario:user});
      });
    },
    update:function(req,res,next) {
        let updateValues = {nombre : req.body.nombre};
        console.log(updateValues);
        Usuario.findByIdAndUpdate(req.body.id,updateValues,function(err,user) {
            
            if (err) {
                console.log(err);
                res.render('usuarios/update',{errors:err.errors,usuario: new Usuario({nombre: req.body.nombre, email: req.body.email})})
            }else{
                res.redirect('/usuarios');
                return;
            }
        });
    },
    create_get:function(req,res,next) {
        res.render('usuarios/create',{errors:{},usuario:new Usuario({})});
    },
    create: function(req,res,next) {
        if (req.body.password != req.body.confirm_pwd) {
            res.render('usuarios/create',{errors:{}, confirm_pwd:{message:"no coinciden las contraseñas"}, usuario: new Usuario({email: req.body.email, nombre: req.body.nombre})  });
            return;
        } else {
            Usuario.create({nombre: req.body.nombre, email: req.body.email, password: req.body.password }, function(err, newUser) {
                if (err) {
                    
                    res.render('usuarios/create',{errors: err.errors, usuario: new Usuario({email: req.body.email, nombre: req.body.nombre}) })

                } else {
                    newUser.enviar_email_bienvenida();
                    res.redirect('http://localhost:3000/usuarios');
                }
            });
        }
    },
    delete: function(req,res,next) {
        Usuario.findByIdAndDelete(req.body.id , function(err) {
            if(err){
                next(err)
            }else{
                res.render('/usuarios');
            }
        });
    },
}

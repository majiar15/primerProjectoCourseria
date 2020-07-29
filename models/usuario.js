let mongoose = require('mongoose');
let Reserva = require('./reserva');
const Token = require('./token');
let mailer = require('../mailer/mailer');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const saltRounds = 10;
let Schema = mongoose.Schema;

const validateEmail = function(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

let usuarioShema = new Schema({
    nombre: {
        type: String,
        trim:true,
        required:[true,"el nombre debe ser obligatorio"]
    },
    email:{
        type: String,
        trim:true,
        required:[true,"el email es obligatorio"],
        lowercase:true,
        unique:true,
        validate:[validateEmail,"porfavor ingrese un email valido"],
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password:{
        type:String,
        required:[true,"la contraseña es obligatoria"],
        passwordResetToken:String,
        passwordRestTokenExpires:Date,
    },
    verificado:{
        type: Boolean,
        default:false
    },
    googleId: String,
    facebookId: String
});

usuarioShema.plugin(uniqueValidator,{message:"el {PATH} existecon otro usuario."});
usuarioShema.pre('save',function(next) {
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password,saltRounds);
    }
    next();
});

usuarioShema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password,this.password);
}

usuarioShema.methods.reservar = function(biciId,desde,hasta,cb) {
    let reserva = new Reserva({usuario:this._id,bicicleta:biciId,desde:desde,hasta,hasta});
    console.log(reserva);
    reserva.save(cb)
}
usuarioShema.methods.enviar_email_bienvenida = function(cb) {
    const token = new Token({_userId: this._id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;
    console.log("object");
    token.save(function(err) {
        if(err) console.log(err.message);

        const mailOptions = {
            from: 'no-reply@redBicicletas.com',
            to:email_destination,
            subject: 'Verificacion de cuenta',
            text: "Hola\n\n" + 'por favor, para verificar su cuenta haga click en este enlace \n'+ `http://localhost:3000/token/confirmation/${token.token}`
        };

        mailer.sendMail(mailOptions,function(err) {
            if(err) console.log(err);
            console.log("se ha enviado un email de bienvenida al correo : "+email_destination+'.');
        });
    });
}

usuarioShema.methods.resetPassword = function(cb) {
    const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination  = this.email;
    token.save(function(err) {
        if(err) return cb(err);
        const mailOptions = {
            from: 'no-reply@redBicicletas.com',
            to:email_destination,
            subject: 'reseteo de password de cuenta ',
            text: "Hola\n\n" + 'por favor, para rastrear la password de  su cuenta haga click en este enlace \n'+ `http://localhost:3000/resetPassword/${token.token}`,
        };
        mailer.sendMail(mailOptions,function(err) {
            if(err) return cb(err);
            console.log("se ha enviado un email para recetear la password al correo : "+email_destination+'.');
        });
        cb(null);
    });
}
usuarioShema.statics.findOrCreateByGoogle = function(condition,callback) {
    const self = this;
    console.log(condition);
    self.findOne({
        $or:[
            {"googleId":condition.id},{'email':condition.emails[0].value}
        ]
    },(err,result)=>{
        if(result){
            callback(err,result);
        }else{
            console.log('-------------------condition-----------------');
            console.log(condition);
            let values = {};
            values.googleId = condition.id;
            values.email = condition.emails[0].value;
            values.nombre = condition.displayName || 'SIN NOMBRE';
            values.verificado = true;
            values.password = condition._json.sub;
            console.log('----------------values-------------');
            console.log(values);
            self.create(values,(err,result)=>{
                if(err) console.log(err);
                return callback(err,result);
            });

        }
    });
};
usuarioShema.statics.findOrCreateByFacebook = function(condition, callback) {
    const self = this;
    console.log(condition);
    self.findOne({
        $or:[
            {"facebookId":condition.id},{'email':condition.emails[0].value}
        ]
    },(err,result)=>{
        if(result){
            callback(err,result);
        }else{
            console.log('-------------------condition-----------------');
            console.log(condition);
            let values = {};
            values.facebookId = condition.id;
            values.email = "dyejxeahri_1596041841@tfbnw.net";  
            values.nombre = condition.displayName || 'SIN NOMBRE';
            values.verificado = true;
            values.password = crypto.randomBytes(16).toString('hex');
            console.log('----------------values-------------');
            console.log(values);
            self.create(values,(err,result)=>{
                if(err) console.log(err);
                return callback(err,result);
            });

        }
    });   
}

module.exports = mongoose.model('Usuario',usuarioShema);
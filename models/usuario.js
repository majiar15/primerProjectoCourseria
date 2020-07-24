let mongoose = require('mongoose');
let Reserva = require('./reserva');
let Schema = mongoose.Schema;

let usuarioShema = new Schema({
    nombre: String,
});

usuarioShema.methods.reservar = function(biciId,desde,hasta,cb) {
    let reserva = new Reserva({usuario:this._id,bicicleta:biciId,desde:desde,hasta,hasta});
    console.log(reserva);
    reserva.save(cb)
}

module.exports = mongoose.model('Usuario',usuarioShema);
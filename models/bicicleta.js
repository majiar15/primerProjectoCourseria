let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let BicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type:[Number], index:{type:"3DSPHERE",sparse:true}
    }

});


BicicletaSchema.method.toString = function() {
    return `code : ${this.id} | color ${this.color}`; 
}

BicicletaSchema.statics.createInstance = function (code,color, modelo, ubicacion) {
    return new this({
        code:code,
        color:color,
        modelo:modelo,
        ubicacion:ubicacion
    })
}

BicicletaSchema.statics.allBicis = function(cb) {
    return this.find({},cb)
}
BicicletaSchema.statics.add = function(bici,cb) {
    this.create(bici,cb);
}
BicicletaSchema.statics.findByCode = function(aCode,cb) {
    return this.findOne({code:aCode},cb);
}
BicicletaSchema.statics.removeByCode = function(aCode,cb) {
    return this.deleteOne({code:aCode},cb);
}

module.exports = mongoose.model("bicicleta",BicicletaSchema);
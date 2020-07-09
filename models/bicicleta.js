let Bicicleta = function(id, color, modelo, ubicacion) {
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

Bicicleta.prototype.toString = function() {
    return 'id : ' + this.id + '| color:' + this.color;
}
Bicicleta.allbicis = [];
Bicicleta.add = function(aBici) {
    Bicicleta.allbicis.push(aBici);
}

Bicicleta.findById = function(abiciId) {
    let abici = Bicicleta.allbicis.find(x => x.id == abiciId);
    if (abici) return abici
    else {
        throw new Error(`No existe una bicicleta con el id ${abiciId}`)
    }

}

Bicicleta.removeById = function(abiciId) {
    for (let i = 0; i < Bicicleta.allbicis.length; i++) {
        if (Bicicleta.allbicis[i].id == abiciId) {
            Bicicleta.allbicis.splice(i, 1);
            break;
        }
    }
}

let bici1 = new Bicicleta(1, 'rojo', 'urbana', [10.946179, -74.798056]);
let bici2 = new Bicicleta(2, 'amarillo', 'urbana', [10.983697, -74.804657]);

Bicicleta.add(bici1);
Bicicleta.add(bici2);

module.exports = Bicicleta;
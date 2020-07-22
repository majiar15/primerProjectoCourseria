const mongoose = require('mongoose');
const Bicicleta = require('../../models/bicicleta');
const Usuario = require('../../models/usuario');
const Reserva = require('../../models/reserva');
const { response } = require('express');


describe("Testing usuarios",()=>{
    beforeEach(function(done) {
        let mongoDb = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDb,{useNewUrlParser:true,useUnifiedTopology:true});
        const db = mongoose.connection;
        db.on('error',console.error.bind(console,"error al conectarse a la db"));
        db.once('open',function () {
            console.log("we are conect test database ");
            done();
        })
    });

    afterEach(function(done) {
        Reserva.deleteMany({},function(err,success) {
            if(err) console.log(err);
            Usuario.deleteMany({},function(err,success) {
                if(err) console.log(err);
                Bicicleta.deleteMany({},function(err,success) {
                    if(err) console.log(err);
                    done();
                })
            })
        });
    });
    

    describe("cuando un usuario reserva una bici",()=>{
        it('desde existir la reserva',(done)=>{
            const usuario = new Usuario({nombre: "martin"});
            usuario.save();
            const bicicleta = new Bicicleta({code:1,color:"verde",modelo:"urbana"});
            bicicleta.save();

            let hoy = new Date();
            let mañana = new Date();
            mañana.setDate(hoy.getDate()+1);

            usuario.reservar(bicicleta.id,hoy,mañana,function(err, reserva) {
                
                Reserva.find({}).populate('bicicleta').populate('usuario').exec(function(err,reservas){
                    console.log(reservas[0]);
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasDeReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                    done();
                });
            });
        });
    });



});
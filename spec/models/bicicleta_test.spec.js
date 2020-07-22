let mongoose = require("mongoose");
let Bicicleta = require("../../models/bicicleta");
const bicicleta = require("../../models/bicicleta");



describe("Test Bicicleta", ()=>{
    beforeEach(function(done) {
        let mongoDb = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDb,{useNewUrlParser:true,useUnifiedTopology:true});
        const db = mongoose.connection;
        db.on('error',console.error.bind(console,"error al conectarse a la db"));
        db.once('open',function () {
            console.log("we are conect test database");
            done();
        })
    });

    afterEach(function(done) {
        Bicicleta.deleteMany({},function(err,success) {
            if(err) console.log(err);
            done();
        });
    });

    describe("Bicicleta create instance",()=>{
        it("crear una instancia de bicicleta",()=>{
            let bici = Bicicleta.createInstance(1,"verde","urbana",[-34.5,-51.1]);
            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("urbana");
            expect(bici.ubicacion[0]).toBe(-34.5);
            expect(bici.ubicacion[1]).toBe(-51.1);
        });
    });

    describe("Bicicleta.allBicis",()=>{
        it("comienza vacia",(done)=>{
            Bicicleta.allBicis((err,bicis)=>{
                expect(bicis.length).toBe(0);
                done();
            });
        });
    });

    describe("bici.add",()=>{
        it("agrega solo una instancia a la db",(done)=>{
            let bici = new Bicicleta({code:1,color:"verde",modelo:"urbana"});
            Bicicleta.add(bici,function(err,newBici) {
                if(err) console.log(err);
                Bicicleta.allBicis(function(err,bicis) {
                    expect(bicis.length).toBe(1);
                    expect(bicis[0].code).toBe(bici.code);

                    done();
                })
            });
        });
    });
    describe("bicicleta.findByCode",()=>{
        it("debe devolver la bici con id 1",(done)=>{
            Bicicleta.allBicis(function(err,bicis) {
                expect(bicis.length).toBe(0);

                let aBici = new Bicicleta({code:1,color:"verde",modelo:"urbana"});
                Bicicleta.add(aBici,function(err,newBici) {
                    if (err) console.log(err);

                    let aBici2 = new Bicicleta({code:2,color:"roja",modelo:"urbana"});
                    Bicicleta.add(aBici2,function(err,newBici) {
                        if(err) console.log(err);
                        Bicicleta.findByCode(1,function(err,targetBici){
                            expect(targetBici.code).toBe(aBici.code);
                            expect(targetBici.color).toBe(aBici.color);
                            expect(targetBici.modelo).toBe(aBici.modelo);
                            
                            done();
                        });
                    })
                });
            })
        });
    });



});
// describe("bicicletas.Allbicis", () =>{
//     it("comienza vacia", () => {
//         expect(Bicicletas.allbicis.length).toBe(0);
//     })
// });
// describe("bicicletas.add",() => {
//     it("añada un elemento", ()=>{
//         expect(Bicicletas.allbicis.length).toBe(0);

//         let bici1 = new Bicicletas(1, 'rojo', 'urbana', [10.946179, -74.798056]);
        
//         Bicicletas.add(bici1);
//         expect(Bicicletas.allbicis.length).toBe(1);
//         expect(Bicicletas.allbicis[0]).toBe(bici1);
//     })
// });
// describe("bicicleta.findById", () =>{
//     it("agrega nueva bicicleta", () =>{
        
//         let bici1 = new Bicicletas(1, 'rojo', 'urbana', [10.946179, -74.798056]);
//         let bici2 = new Bicicletas(2, 'amarillo', 'urbana', [10.983697, -74.804657]);
//         Bicicletas.add(bici1);
//         Bicicletas.add(bici2);
//         let resultBici = Bicicletas.findById(2);
//         expect(resultBici.id).toBe(bici2.id);
//         expect(resultBici.color).toBe(bici2.color);
//         expect(resultBici.modelo).toBe(bici2.modelo);

        
//     });
// });
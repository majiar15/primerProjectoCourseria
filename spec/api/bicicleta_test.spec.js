let Bicicleta = require("../../models/bicicleta");
let request = require("request");
let server = require("../../bin/www");
let mongoose = require("mongoose");
let url_base = "http://localhost:3000/api/bicicletas";

describe("Bicicletas Api",()=>{
    beforeEach(function(done) {
        let mongoDB = "mongodb://localhost/testdb";
        mongoose.connect(mongoDB,{useNewUrlParser: true, useUnifiedTopology:true});
        const db = mongoose.connection;
        db.on("error",console.error.bind(console,"error al conectar a la db"));
        db.once('open',function() {
            console.log("we are conect to db");
            done();
        });

    });

    afterEach(function(done) {
        Bicicleta.deleteMany({},function(err,success) {
            if(err) console.log(err);
            done();
        });
    });


    describe('Bicicleta Api',() => { 
        describe('GET Bicicletas /',() => { 
            it('Status 200', (done) => {
                Bicicleta.allBicis(function(err, bicis){
                    expect(bicis.length).toBe(0);
                    let aBici = new Bicicleta({code: 1, color: "Verde", modelo:"Urbana"});
                    Bicicleta.add(aBici,function(err, newBici){
                        if (err) console.log(err);
                        request.get(url_base,function(error,response,body){
                            expect(response.statusCode).toBe(200);
                            done();
                        });
                    });
                });
            });
        });
    });
    
    



// describe("Bicicletas APi",()=>{
//     describe("GET Bicis",()=>{
//         it("status 200",()=>{
//             expect(Bicicleta.allbicis.length).toBe(0);
//             let bici1 = new Bicicleta(1, 'rojo', 'urbana', [10.946179, -74.798056]);
//             Bicicleta.add(bici1);

//             request.get("http://localhost:3000/api/bicicletas",(error, response, body)=>{
//                 expect(response.statusCode).toBe(200);
//             });
//         });
//     });

    // describe("POST Bicicletas | create", ()=>{
    //     it("status 200",(done)=>{
    //         let header = {"content-type":"application/json"};
    //         let bici = '{"code":10,"color":"negra","modelo":"montaña","lat":-34,"lng":-54}';
    //         request.post({
    //             headers:header,
    //             url: url_base+"/create",
    //             body: bici,
               
    //         },(error,response,body)=>{
    //             // expect(response.statusCode).toBe(200);
    //             let bici = JSON.parse(body);
    //             console.log(bici);
    //             // expect(bici.color).toBe("negra");
    //             done();
    //         });
    //     });
    // });





//     describe("PUT bicicletas|update",()=>{

        
//         it("status 200",(done)=>{
//             //insertar registro
//             request.post({
//                 headers:{"content-type":"application/json"},
//                 url: "http://localhost:3000/api/bicicletas/create",
//                 body: '{"id":10,"color":"negra","modelo":"montaña","lat":-34,"lng":-54}',
               
//             },(error,response,body)=>{
//                 done();
//             });
//             // modificar registro

//             let header = {"content-type":"application/json"};
//             let bici = '{"id":10,"color":"negra","modelo":"montaña","lat":-34,"lng":-54}';
//             request.put({
//                headers:header,
//                url: "http://localhost:3000/api/bicicletas/update",
//                body:bici
//             },(error,response,body)=>{
//                 expect(response.statusCode).toBe(200);
//                 done();

//             });
//         });
//     });


//     describe("DELETE bicicletas | delete",()=>{
//         it("status 200",(done)=>{
//             let header = {"content-type":"application/json"};
//             let body = '{"id":10}'
//             request.delete({
//                 headers:header,
//                 url: "http://localhost:3000/api/bicicletas/delete",
//                 body:body

//             },(error, response,body)=>{
//                 expect(response.statusCode).toBe(204);
//                 expect(Bicicleta.allbicis.length).toBe(0);
//                 done();   
//             });
//         });
//     });


    



});
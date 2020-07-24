let Bicicleta = require('../../models/bicicleta');

exports.bicicleta_list = function(req, res) {
    
    let bicis = Bicicleta.allBicis(function(err, bicis){
        if(err) {
            console.log(err);
            res.status(400).send("error al consultar");
        }else{
            res.status(200).json({
                bicicleta: bicis
            });
        }
        
    });
   
}

exports.bicicleta_create = function(req, res) {
    let code = req.body.code;
    let color = req.body.color;
    let modelo = req.body.modelo;
    
    let bici = new Bicicleta({code,color,modelo});
    bici.ubicacion = [req.body.lat, req.body.lng];
    
    Bicicleta.add(bici,(err,bicicleta)=>{
        if(err){
            console.log(err);
            res.status(400).send(`error :${err}`);  
        } 
        else{
            res.status(200).json({
                bicicleta: bicicleta
            })
        }
    });
    
}
exports.bicicleta_update = function(req, res) {
    let bici = Bicicleta.findByCode(req.body.code,function(err,Oldbici){
        if(err){
            console.log(err);  
            res.status(200).send(`error al actualizar el registro ${err}` )
        }else{
        Oldbici.color = req.body.color;
        Oldbici.modelo = req.body.modelo;
        Oldbici.ubicacion = req.body.ubicacion;
        Oldbici.save();
        res.status(200).json({
            bicicleta: Oldbici
        });
        }
        
    });
    // console.log(bici);
    

    
}
exports.bicicleta_delete = function(req, res) {
    Bicicleta.removeByCode(req.body.code,function(err,DeleteBici) {
        if(err){
            console.log(err)
            res.status(400).send(`error: ${err}`);    
        }else{
            console.log(DeleteBici);
            res.status(202).send(`se elimino la bicicleta con el codigo : ${req.body.code}`);        
        }
        
    });
    
}
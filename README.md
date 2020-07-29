# primerProjectoCoursera
proyecto del curso node js de coursera
#link de la aplicacion publicada 

https://red-bicicleta-majiar.herokuapp.com/

## semana 1 
Endpoints 

GET | http://localhost:3000/api/bicicletas  -> obtiene el listado de todas las bicicletas

POST | http://localhost:3000/api/bicicletas/create  -> crea una nueva bicicleta 

put | http://localhost:3000/api/bicicletas/update -> actualiza una bicicleta

delete | http://localhost:3000/api/bicicletas/delete -> borra una bicicleta apartir de un id pasador por body



-----

## semana 2

Endpoints Bicicletas

GET | http://localhost:3000/api/bicicletas  -> obtiene el listado de todas las bicicletas

POST | http://localhost:3000/api/bicicletas/create  -> crea una nueva bicicleta

ejemplo de parametros
```javascript
{
    "color":"dorado",
    "modelo":"montaña",
    "lat":12,
    "lng":15
}
```

put | http://localhost:3000/api/bicicletas/update -> actualiza una bicicleta

ejemplo de parametros
```javascript
{
    "code":"5f1a309518178b127ce94d48",
    "color":"lila",
    "modelo":"urbana",
    "lat":43,
    "lng":12
}
```

delete | http://localhost:3000/api/bicicletas/delete -> borra una bicicleta apartir de un id pasado por body

ejemplo de parametros
```javascript
{
    "code":"5f1a309518178b127ce94d48",
}
```

Endpoints Usuarios

GET | http://localhost:3000/api/usuarios/ -> obtener todos los usuarios 
POST | http://localhost:3000/api/usuarios/create -> crear un nuevo usuario 

ejemplo parametros 
```javascript
{
    "nombre":"luis"
}
```
post | http://localhost:3000/api/usuarios/reservar -> reserva una bicicleta 

ejemplo de  parametros
```javascript
{
    "id": "5f1a2cc707c9eb25d0361666",
    "bici_id": "5f19ef77cdeae00becaa68cb",
    "desde": "2020-07-20",
    "hasta": "2020-07-23"
}
```

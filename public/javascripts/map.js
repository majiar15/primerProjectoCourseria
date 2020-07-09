let map = L.map('map').setView([10.988401, -74.788377], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyrigth">Open Street Map</a>',

}).addTo(map);


$.ajax({
    dataType: "json",
    url: "api/bicicletas",
    success: function(result) {
        console.log(result);
        result.bicicleta.forEach(function(bici) {
            L.marker(bici.ubicacion, { title: bici.id }).addTo(map);
        })
    }
})
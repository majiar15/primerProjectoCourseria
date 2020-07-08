let map = L.map('map').setView([10.988401, -74.788377], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyrigth">Open Street Map</a>',

}).addTo(map);
L.marker([10.988401, -74.788377]).addTo(map)
    .bindPopup('Universidad Libre Cede centro.')
    .openPopup();
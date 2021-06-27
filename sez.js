var mymap = L.map('mapid').setView([45.7489, 21.2087], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
}).addTo(mymap);
var marker = L.marker([45.7489, 21.2087 -0.09]).addTo(mymap);


// var popup = new L.marker();

// function onMapClick(e) {
//     marker
//         .bindPopup("Ai selectat ").openPopup()
//         .setLatLng(e.latlng)
//         // .setContent("You clicked the map at " + e.latlng.toString())
//         .openOn(mymap);
// }

// mymap.on('click', onMapClick);

var markers = []

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://sibiuinventoryapimanager.azure-api.net/v1/Pins", requestOptions)
  .then(response => response.json())
  .then(results=> {
      for(let i = 0; i < results.data.length; i++) {
        var newMarker = L.marker([results.data[i].gpsCoordX, results.data[i].gpsCoordY])
        .bindPopup("<div> <b>Description: </b>"+results.data[i].description+"</div><hr>"+
        "<a href='administrare.html#editForm' class='btn btn-info btn-fill btn-wd''>Report an issue</a>")
        .addTo(mymap);
        newMarker.addEventListener('click',logPosition);
        markers.push(results.data[i]);        
      }
  })
  .catch(error => console.log('error', error));

function logPosition(e) {
  let coordinates = e.latlng;
  var latElement = document.getElementById('latitude');
  latElement.value = coordinates.lat;
  latElement.style.border = '1px solid black';      
  var lngElement = document.getElementById('longitude');
  lngElement.value = coordinates.lng;        
  lngElement.style.border = '1px solid black';   

  for(let i = 0; i < markers.length; i++) {
    if (markers[i].gpsCoordX == latElement.value && markers[i].gpsCoordY == lngElement.value) {
      document.getElementById('pinDescription').value = markers[i].description;
      break;
    }
  }  
}  
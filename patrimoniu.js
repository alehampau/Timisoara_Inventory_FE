var mymap = L.map('mapid').setView([45.7489, 21.2087], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery ©️ <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
}).addTo(mymap);

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://sibiuinventoryapimanager.azure-api.net/v1/Pins", requestOptions)
    .then(response => response.json())
    .then(results=> {
        for(let i = 0; i < results.data.length; i++) {
            if (isDesiredPinType(results.data[i].pinTypeId)){
                L.marker([results.data[i].gpsCoordX, results.data[i].gpsCoordY])
                .bindPopup("<div> <b>Description</b><hr>"+results.data[i].description+"</div>")
                .addTo(mymap);
            }
        }
    })
    .catch(error => console.log('error', error));
function isDesiredPinType(pinType){
    if(pinType==4){
        return true;
    }
    if(pinType==7){
        return true;
    }
    if(pinType==8){
        return true;
    }
    if(pinType==9){
        return true;
    }
    if(pinType==10){
        return true;
    }
    if(pinType==11){
        return true;
    }
    if(pinType==13){
        return true;
    } return false;
}


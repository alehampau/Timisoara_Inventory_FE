var mymap = L.map('mapid').setView([45.7489, 21.2087], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery ©️ <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
}).addTo(mymap);

// var marker = L.marker([45.7489, 21.2087 -0.09]).addTo(mymap);


var popup = new L.marker();

function onMapClick(e) {
    marker
        .bindPopup("<button> bla bla </button>").openPopup()
        .setLatLng(e.latlng)
        // .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);

//Functionality for pins
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("https://sibiuinventoryapimanager.azure-api.net/v1/Pins", requestOptions)
    .then(response => response.json())
    .then(results=> {
        for(let i = 0; i < results.data.length; i++) {
           
          L.marker([results.data[i].gpsCoordX, results.data[i].gpsCoordY]).addTo(mymap);
          
        }
    })
    .catch(error => console.log('error', error));
    var saveBtn = document.getElementById('saveBtn');
    var editForm = document.getElementById('editForm');
    document.addEventListener('click', save);

    function save() {
        console.log("button clicked");
        let coordinates =sessionStorage.getItem('lastClickedCoordinates');
        editForm.style.display = 'visible';
        console.log(coordinates);
    }
    
    function onMapClick(e) {
        let coordinates = e.latlng;
        sessionStorage.setItem('lastClickedCoordinates', coordinates);
        L.popup()
        .setLatLng(coordinates)
        .setContent("<a href='administrare.html#editForm' id='saveBtn' class='btn btn-info btn-fill btn-wd'>Salveaza marker</a>")
        .openOn(mymap);
    }

    
      
      fetch("https://sibiuinventoryapimanager.azure-api.net/v1/PinTypes", {
        method: 'GET',
        redirect: 'follow'
      })
      .then(response => response.json())
      .then(results=> {
          var selector = document.getElementById("categoryMaster");
          for(let i = 0; i < results.data.length; i++) {
            var option = document.createElement("option");
            option.text = results.data[i].id + "_" + results.data[i].name;
            selector.add(option);
            
          }
      })
      .catch(error => console.log('error', error));
      
    
  
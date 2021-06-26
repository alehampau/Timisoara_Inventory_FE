//Autentification-authorisation _ admin//
function setVisibility(contentVisibility, loginVisibility){
    var content = document.getElementById('content');
    content.style.display = contentVisibility;
    var login = document.getElementById('login');
    login.style.display = loginVisibility;
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        setVisibility('none' , 'block');
    });
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
    sessionStorage.setItem('is_logged_in', 'true');
    setVisibility('block', 'none');
}

function init(){
    var auth2 = gapi.auth2.getAuthInstance();
    var logInStatus = sessionStorage.getItem('is_logged_in');
    if(logInStatus == 'true'){
        setVisibility('block', 'none');
    }else{
        setVisibility('none' , 'block');
    }
}

//Map -Admin//
var mymap = L.map('mapid').setView([45.7489, 21.2087], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery ©️ <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
}).addTo(mymap);

var marker = L.marker([45.7489, 21.2087 -0.09]).addTo(mymap);


var popup = new L.marker();

function onMapClick(e) {
    marker
        .bindPopup("Ai selectat ").openPopup()
        .setLatLng(e.latlng)
        // .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);
//End of Map Admin//
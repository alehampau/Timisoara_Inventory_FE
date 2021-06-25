// function signin(){
//     document.getElementById('loginBtn').style.visibility='visible';
//   }

let loginBtn = document.getElementById('loginBtn');
loginBtn.addEventListener('click', () =>{
    Swal.fire({
        title: 'Autentificare',
        html: `<input type="text" id="login" class="swal2-input" placeholder="Utilizator">
        <input type="password" id="password" class="swal2-input" placeholder="Parolă">
        <br>
        <h5>Logarea contul Google</h5>
        <a href="www.google.com" id="googleAccount"><i class="fab fa-google-plus-g"></i></a>`,
        confirmButtonText: 'Logare',
        focusConfirm: false,
        preConfirm: () => {
          const login = Swal.getPopup().querySelector('#login').value
          const password = Swal.getPopup().querySelector('#password').value
          if (!login || !password) {
            Swal.showValidationMessage(`Vă rugăm adăugați utilizator și parolă valide`)
          }
          return { login: login, password: password }
        }
      }).then((result) => {
        Swal.fire(`
          Utilizator: ${result.value.login}
          Parolă: ${result.value.password}
        `.trim())
      })
})


var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1
}).addTo(mymap);

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
                  
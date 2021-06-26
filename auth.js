var googleUser = {};
var startApp = function() {
  gapi.load('auth2', function(){
    // Retrieve the singleton for the GoogleAuth library and set up the client.
    auth2 = gapi.auth2.init({
      client_id: '888921774195-m315saae090djjonpdqquthqm0htv8ra.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      // Request scopes in addition to 'profile' and 'email'
      //scope: 'additional_scope'
    });
    attachSignin(document.getElementById('loginBtn'));
  });
};

function showUserName(userName) {
    document.getElementById('name').innerText = userName;
}

function attachSignin(element) {
  auth2.attachClickHandler(element, {},
      function(googleUser) {
        signIn(googleUser);
      }, function(error) {
        alert(JSON.stringify(error, undefined, 2));
      });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        sessionStorage.removeItem('userName');
        showUserName('');
    });
}

function signIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var userName =  googleUser.getBasicProfile().getName();
    sessionStorage.setItem('userName', userName);
    showUserName(userName);    
}

function init(){
    startApp();
    var userName = sessionStorage.getItem('userName');
    if(userName != null){
        showUserName(userName);
    }
}
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

function setUserNameLabel(userName) {
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
        localStorage.removeItem('userName');
        setUserNameLabel('');
        loginVisibility(false); 
    });
}

function signIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    var userName =  googleUser.getBasicProfile().getName();
    localStorage.setItem('userName', userName);
    setUserNameLabel(userName);   
    loginVisibility(true); 
}

startApp();
    var userName = localStorage.getItem('userName');
    if(userName != null){
        setUserNameLabel(userName);
        loginVisibility(true);
    } else {
        loginVisibility(false);
    }

function loginVisibility(isLoggedIn) {
    if (isLoggedIn) {
        document.getElementById('name').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'block';
        document.getElementById('loginBtn').style.display = 'none';
    } else {
        document.getElementById('name').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('loginBtn').style.display = 'block';
    }
}


function realtimeClock(){
  var rtClock = new Date();

  var hours = rtClock.getHours();
  var minutes = rtClock.getMinutes();
  var seconds = rtClock.getSeconds();


  var amPm = (hours < 12) ? "AM" : "PM";

  hours = (hours > 12) ? hours - 12 : hours;

  hours = ("0" + hours).slice(-2);
  minutes = ("0" + minutes).slice(-2);
  seconds = ("0" + seconds).slice(-2);


  document.getElementById('clock').innerHTML = 
      hours + " : " + minutes + " : " + seconds + " " + amPm;
  var t = setTimeout(realtimeClock, 500);
}
var provider = new firebase.auth.GoogleAuthProvider();
var database = firebase.database();

var userdata = null;

// USER AUTHENTICATION FUNCTIONS

// checkAuthState();

function GoogleLogin() {
  firebase.auth().signInWithPopup(provider).then(res=>{
    verifyUser(user);
  }).catch((e)=>{})
}

function checkAuthState(){
  firebase.auth().onAuthStateChanged(user=>{
    if(user){
      userdata = user;
      verifyUser(user);
    }else{
      document.getElementById('login_btn').style.display="block";
      document.getElementById('join_btn').style.display="block";
      document.getElementById('stat_btn').style.display="none";
      document.getElementById('logout_btn').style.display="none";
      document.getElementById('intro').style.display="block";
    }
  })
}

function verifyUser(user){
  database.ref('/users/'+user.uid).once("value").then((snapshot) => {
    var email = snapshot.child('/email').exists();

    if(email === false){
      registerUser(user);
    }else if(email === true){
      verified(user);
    }
  })
}

function registerUser(user){
  database.ref('/users/'+user.uid).update({
    name: user.displayName,
    email: user.email,
    image: user.photoURL,
    joined: Date.now()
  })
  verified(user);
}

function verified(user){
  document.getElementById('login_btn').style.display="none";
  document.getElementById('join_btn').style.display="none";
  document.getElementById('stat_btn').style.display="block";
  document.getElementById('logout_btn').style.display="block";
  document.getElementById('intro').style.display="none";
  document.getElementById('checklist').style.display="block";
}

function GoogleLogout() {
  firebase.auth().signOut().then(()=>{
    checkAuthState();
  }).catch((e)=>{
    console.log(e)
  })
}














function alertMessage(t="success", message){
    let x = document.getElementById("alerts")
    let content = ``
    if(t==="success") {
        x.classList.add("show-alerts-success")
        setTimeout(function(){ x.className = x.className.replace("show-alerts-success", ""); }, 2000);
        content += `
                ${message}`
        x.innerHTML = content;
    }
    else {
        x.classList.add("show-alerts-danger")
        setTimeout(function(){ x.className = x.className.replace("show-alerts-danger", ""); }, 2000);
        content += `
                ${message}`
        x.innerHTML = content;
    }
}

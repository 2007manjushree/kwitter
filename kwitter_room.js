var firebaseConfig = {
      apiKey: "AIzaSyBR5QTb5iUY2rTmijpXSn3XpItXdLcgCbg",
      authDomain: "kwitter-c3fcb.firebaseapp.com",
      databaseURL: "https://kwitter-c3fcb-default-rtdb.firebaseio.com",
      projectId: "kwitter-c3fcb",
      storageBucket: "kwitter-c3fcb.appspot.com",
      messagingSenderId: "825124389111",
      appId: "1:825124389111:web:4df0056cbf5d4c03ad93f2",
      measurementId: "G-69QQBE4D2V"
};
firebase.initializeApp(firebaseConfig);

var roomname, row;
var username = localStorage.getItem("Username");
document.getElementById("welcome_username").innerHTML = username;

function addRoom(){
      roomname = document.getElementById("roomname_input").value;
      firebase.database().ref("/").child(roomname).update({
            purpose : "adding roomname"
      });
      localStorage.setItem("Room Name", roomname);
      window.location = "room_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log("Room Name - " + Room_names);
                  row = "<div class='room_name' id="+ Room_names +" onclick='redirectToRoomPage(this.id)'> # " +Room_names+ "</div> <hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}

getData();

function redirectToRoomPage(name){
      console.log(name);
      localStorage.setItem("Room Name", name);
      window.location = "room_page.html";   
}

function logout() {
      window.location = "index.html";
      localStorage.removeItem("Room Name");
      localStorage.removeItem("Username");
}
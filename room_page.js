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

var username, room_name, message, button_id;

username = localStorage.getItem("Username");
room_name = localStorage.getItem("Room Name");

function send() {
      message = document.getElementById("message").value;
      firebase.database().ref(room_name).push({
            username: username,
            message: message,
            likes: 0
      });
      document.getElementById("message").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        console.log(firebase_message_id);
                        console.log(message_data);
                        username = message_data['username'];
                        message = message_data['message'];
                        likes = message_data['likes'];
                        username_with_img = "<h4>"+username+"<img src='tick.png' class='user_tick'></h4>";
                        message_with_grey = "<h4 class='message_h4'>"+message+"</h4>";
                        button_with_likes = "<button class='btn btn-warning' id="+firebase_message_id+" value="+likes+" onclick='updatedlike(this.id)'>";
                        span_with_like = "<span class='glyphicon glyphicon-thumbs-up'> Likes:"+likes+"</span></button>";
                        row = username_with_img + message_with_grey + button_with_likes + span_with_like;
                        document.getElementById("output").innerHTML += row;
                  }
            });
      });
}

getData();

function updatedlike(message_id) {

      console.log("Clicked on like button" + message_id);
      button_id = message_id;
      like = document.getElementById(button_id).value;
      updatedlikes = Number(like) +1;
      firebase.database().ref(room_name).child(button_id).update ({
            likes : updatedlikes
      });
}

function logout() {
      window.location = "index.html";
      localStorage.removeItem("Room Name");
      localStorage.removeItem("Username");
}
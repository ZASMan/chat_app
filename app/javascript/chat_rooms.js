document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM content loaded, now loading javascripts")
  // Current Chatroom data from user

  var created_by_chatrooms_div = document.getElementById("created_by_chatrooms_data")
  if (created_by_chatrooms_div) {
    var chatroom_json = JSON.parse(created_by_chatrooms_div.innerHTML);
    var list_all_chatrooms_ul = document.getElementById("list_all_chatrooms");
    function initializeChatrooms(chatroom_json) {
      if (chatroom_json) {
        Object.entries(chatroom_json).forEach((chatroom) => {
          const [key, value] = chatroom;
          chatroom_object_id = value["id"];
          new_li = document.createElement("li");
          newlink = document.createElement('a');
          newlink.innerHTML = 'Enter Chatroom ' + chatroom_object_id;
          newlink.setAttribute('href', "/chat_rooms/" + chatroom_object_id);
          new_li.appendChild(newlink);
          list_all_chatrooms_ul.appendChild(new_li);
        })
      }
    }
    initializeChatrooms(chatroom_json);
  };
});

document.addEventListener("DOMContentLoaded", function() {
  
  var current_chatroom_div = document.getElementById("chat_room_json_data_url");
  if (current_chatroom_div) {
    console.log("current_chatroom_div present");
    const CURRENT_CHATROOM_URL = current_chatroom_div.innerHTML;
    let ChatRoom = class {
      constructor(chatroom) {
        this.id = chatroom.id;
        this.user_id = chatroom.user_id;
        this.messages = chatroom.messages;
      }

      static getChatRoom() {
        fetch(CURRENT_CHATROOM_URL)
        .then(res => res.json())
        .then(chatroomData => {
          console.log(chatroomData);
        })
      }
    }
    ChatRoom.getChatRoom();
    console.log("Current chatroom div present");
  }
});
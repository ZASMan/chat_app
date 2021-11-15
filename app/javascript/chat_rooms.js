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
  var messages_ul = document.getElementById("chat_room_message_list")
  var message_form = document.getElementById("message_form");
  if (current_chatroom_div && messages_ul && message_form) {
    function submitChatroomMessage(event) {
      event.preventDefault();
      new_mesage = new Message(event.content)
      console.log("New message content is " + JSON.stringify(new_mesage.content));
    }
    console.log("all elements loaded");
    message_form.addEventListener("submit", submitChatroomMessage);
    const CURRENT_CHATROOM_URL = current_chatroom_div.innerHTML;
    let Message = class {
      constructor(message) {
        this.content = message.content
        this.sender_id = message.sender_id
        this.recipient_id = message.recipient_id
      }

      static sendNewMessage() {
        console.log("Sending message");
      }
    }
    let ChatRoom = class {
      constructor(chatroom) {
        this.id = chatroom.id;
        this.user_id = chatroom.user_id;
        this.messages = chatroom.messages;
      }

      static getChatRoomMemberData() {
        fetch(CURRENT_CHATROOM_URL)
        .then(res => res.json())
        .then(chatroomData => {
        });
      }

      static getChatRoomMessages() {
        fetch(CURRENT_CHATROOM_URL)
        .then(res => res.json())
        .then(chatroomData => {
          chatroomData['messages'].forEach((message_data) => {
            console.log("Message data is " + JSON.stringify(message_data))
            new_li = document.createElement("li");
            sent_at_date = new Date(message_data['created_at'])
            new_li.innerHTML = "<hr>" +  message_data['content'] + "<br>" + "Sent at: " + sent_at_date + "<hr>"
            messages_ul.appendChild(new_li)
          })
        })
      }
    }
    ChatRoom.getChatRoomMessages();
    console.log("Current chatroom div present");
  }
});

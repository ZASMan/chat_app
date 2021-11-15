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
  var message_form = document.getElementById("new_message");
  // These will be refatored to backend stuff eventually when I know what I'm doing
  var sender_id = document.getElementById("sender_id");
  var participant_ids = document.getElementById("participant_ids");
  var chat_room_id = document.getElementById("chat_room_id");
  var loading_div = document.getElementById("loading_div");
  if (current_chatroom_div && messages_ul && message_form && sender_id && participant_ids && chat_room_id) {
    var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    const CURRENT_CHATROOM_URL = current_chatroom_div.innerHTML;
    let Message = class {
      constructor(message) {
        this.content = message.content
        this.sender_id = message.sender_id
        this.recipient_ids = message.recipient_ids
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
          var participant_data = {sender_id: chatroomData["user_id"], participant_ids: chatroomData['participant_ids']}
          return participant_data
        });
      }

      static setChatRoomMessages() {
        fetch(CURRENT_CHATROOM_URL)
        .then(res => res.json())
        .then(chatroomData => {
          chatroomData['messages'].forEach((message_data) => {
            new_li = document.createElement("li");
            sent_at_date = new Date(message_data['created_at'])
            new_li.innerHTML = "<hr>" +  message_data['content'] + "<br>" + "Sent at: " + sent_at_date + "<hr>"
            messages_ul.appendChild(new_li)
          })
        })
      }
    }
    ChatRoom.setChatRoomMessages();
    /*
    function submitChatroomMessage(event) {
      var message_form = document.getElementById("message_form");
      var message_content = message_form.content.value;
      //const new_message = new Message(message_form.content.value, sender_id.innerHTML, participant_ids.innerHTML)
      //console.log("New message content is " + new_message.content)
      fetch("/chat_rooms/" + chat_room_id.innerHTML + "/messages", {
        method: "POST",
        headers: {
          "X-CSRF-Token": csrfToken,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {content: message_content, chat_room_id: chat_room_id.innerHTML, sender_id: sender_id.innerHTML}
        )
      }).then(response => {
        if (!response.ok) { throw response; }
        return response.json();
      }).then((data) => {
        console.log(data);
      }).catch(error => {
        console.error("error", error);
      });

      event.preventDefault();
    }
    */
    //message_form.addEventListener("submit", submitChatroomMessage);
    // Refresh Messages
    function refreshMessages() {
      var loading_div = document.getElementById("loading_div");
      console.log("Refreshing.");
      var messages_ul = document.getElementById("chat_room_message_list");
      messages_ul.innerHTML = '';
      loading_div.classList.remove("hidden");
      ChatRoom.setChatRoomMessages();
      loading_div.classList.add("hidden");
    }
    //const interval = setInterval(refreshMessages, 3000);
  }
});
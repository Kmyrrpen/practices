const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const roomName = document.getElementById("room-name");
const userList = document.getElementById("users");

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit("joinRoom", { username, room });

// catch "message" event from the server.
socket.on("message", (message) => {
  console.log("message received: \n" + message);
  outputMessage(message);
});

socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// chat form submit
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get text from form
  const input = e.target.elements.msg;

  // emit message to be picked up by the server
  socket.emit("chatMessage", input.value);

  input.value = "";
  input.focus();
});

// create message DOM element
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `
    <p class="meta">${message.username} <span> ${message.time} </span></p>
    <p class="text">
      ${message.text}
    </p>
  `;

  // before appending message to DOM, check if scroll is all the way down.
  const { maxHeight } = window.getComputedStyle(chatMessages);
  const scrollTopDiff = chatMessages.scrollHeight - chatMessages.scrollTop;
  const isScrollLatest = scrollTopDiff <= parseInt(maxHeight) + 3;

  chatMessages.appendChild(div);

  // if scroll was all the way down, place scroll all the way down again.
  if (isScrollLatest) chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add room name to DOM
function outputRoomName(room) {
  roomName.innerText = room;
}

function outputUsers(users) {
  userList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join("")}
  `;
}

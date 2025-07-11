let websocket = null;
const chatDiv = document.getElementById("chat");

let maxMsgCount = 10;
let messageQueue = [];
let isProcessing = false;

function updateMaxMsgCount() {
  const chatHeight = chatDiv.clientHeight;
  const lineHeight = 90;
  maxMsgCount = Math.floor(chatHeight / lineHeight);
}

window.addEventListener("resize", updateMaxMsgCount);
window.addEventListener("DOMContentLoaded", () => {
  updateMaxMsgCount();
  connect();
});

function connect() {
  if (websocket) return;

  websocket = new WebSocket("ws://localhost:21213/");

  websocket.onopen = function () {
    document.getElementById("status").innerHTML = "Connected";
  };

  websocket.onclose = function () {
    document.getElementById("status").innerHTML = "Disconnected";
    websocket = null;
    setTimeout(connect, 1000);
  };

  websocket.onerror = function () {
    document.getElementById("status").innerHTML = "Connection Failed";
    websocket = null;
    setTimeout(connect, 1000);
  };

  websocket.onmessage = function (event) {
    try {
      const parsed = JSON.parse(event.data);

      if (parsed.event === "chat" && parsed.data) {
        const { nickname, comment, profilePictureUrl } = parsed.data;
        if (!nickname || !comment) return;

        // Push to queue with adapted field names
        messageQueue.push({
          user: nickname,
          comment: comment,
          avatar: profilePictureUrl,
        });

        processNextMessage();
      }
    } catch (e) {
      console.error("Invalid JSON", e);
    }
  };
}

function processNextMessage() {
  if (isProcessing || messageQueue.length === 0) return;

  isProcessing = true;
  const data = messageQueue.shift();

  const existingMsgs = Array.from(chatDiv.children);
  const firstRects = existingMsgs.map((el) => el.getBoundingClientRect());

  const div = document.createElement("div");
  div.className = "msg";

  const avatar = createSafeImage(data.avatar);

  const content = document.createElement("div");
  content.className = "msg-content";

  const name = document.createElement("span");
  name.className = "user";
  name.textContent = data.user;

  const text = document.createElement("span");
  text.className = "text";
  text.textContent = data.comment;

  const heart = document.createElement("span");
  heart.className = "icon-heart";
  heart.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 72 72"><path fill="#FF473E" d="M60.1 23.3c-5.9-7-16.5-7.4-22.8-1c-.9.9-2.3.9-3.1 0c-6-6.1-15.9-6.1-21.9 0c-5.2 5.1-6 13.4-2 19.5c1.2 1.9 2.8 3.4 4.5 4.5l19.9 16.1c.7.6 1.7.6 2.4 0l19.8-16.1c1.7-1.1 3.2-2.5 4.4-4.4c3.6-5.7 3.2-13.4-1.2-18.6z"/></svg>
`;

  content.append(name, text, heart);
  div.append(avatar, content);
  chatDiv.appendChild(div);

  requestAnimationFrame(() => {
    const lastRects = existingMsgs.map((el) => el.getBoundingClientRect());

    existingMsgs.forEach((el, i) => {
      const deltaY = firstRects[i].top - lastRects[i].top;

      if (deltaY !== 0) {
        el.style.transition = "none";
        el.style.transform = `translateY(${deltaY}px)`;
        el.getBoundingClientRect(); // force reflow
        el.style.transition = "transform 0.4s ease";
        el.style.transform = "translateY(0)";
      }
    });

    requestAnimationFrame(() => {
      div.classList.add("show");

      setTimeout(() => {
        trimMessages();
        isProcessing = false;
        processNextMessage();
      }, 450);
    });
  });
}

function trimMessages() {
  while (chatDiv.children.length > maxMsgCount) {
    chatDiv.removeChild(chatDiv.firstChild);
  }
}

function createSafeImage(src) {
  const wrapper = document.createElement("div");
  wrapper.className = "avatar-wrapper";

  const img = document.createElement("img");
  img.className = "avatar";
  img.src = src;
  img.alt = "avatar";
  img.onerror = () => {
    img.src = "https://placehold.co/32x32";
  };

  wrapper.appendChild(img);
  return wrapper;
}

document.addEventListener("DOMContentLoaded", function () {
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatSection = document.getElementById("chatSection");

  // Simulate a bot response (replace with real backend call if needed)
  function botReply(userMsg) {
    // Simple bot logic for demo
    if (userMsg.toLowerCase().includes("hello") || userMsg.toLowerCase().includes("hi") ){
      return "Hello! 👋 How can I help you today?";
    }
    if (userMsg.toLowerCase().includes("how are you")) {
      return "I'm just code, but I'm doing great! 😊 What about you";
    }
    return "I'm ChatGPT! Ask me anything.";
  }

  function appendMessage(content, sender = "user") {
    const msgDiv = document.createElement("div");
    msgDiv.className = "chat-message " + (sender === "bot" ? "bot" : "user");
    msgDiv.innerHTML = `
            <div class="message-content">
                ${content}
            </div>
        `;
    chatSection.appendChild(msgDiv);
    chatSection.scrollTop = chatSection.scrollHeight;
  }

  chatForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const userMsg = chatInput.value.trim();
    if (!userMsg) return;
    appendMessage(
      `<span class="message-highlight">You:</span> <p id="replyPara">${userMsg}</p>`,
      "user"
    );
    chatInput.value = "";

    // Simulate bot response after a short delay
    setTimeout(() => {
      const reply = botReply(userMsg);
      appendMessage(
        `<span class="message-highlight">ChatGPT:</span> <p id="replyPara">${reply}</p>`,
        "bot"
      );
    }, 600);
  });
});


const menuBtn = document.getElementById('mobileMenuBtn');
const menuDropdown = document.getElementById('mobileMenuDropdown');

menuBtn.addEventListener('click', () => {
  menuDropdown.classList.toggle('active');
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (!menuDropdown.contains(e.target) && !menuBtn.contains(e.target)) {
    menuDropdown.classList.remove('active');
  }
});

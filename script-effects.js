function toggleMenu() {
  const nav = document.getElementById("nav-menu");
  nav.classList.toggle("show");
}

// Auto Footer Year
document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if (y) y.innerText = new Date().getFullYear();
});

// Typed.js effect (optional)
if (document.querySelector('.typing')) {
  const typed = new Typed('.typing', {
    strings: ["Business Developer", "CRM Expert", "Digital Marketer", "Learner"],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true
  });
}

// Page Transitions
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a');

  links.forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');

      if (href && href.startsWith('#')) {
        return;
      }

      e.preventDefault();
      document.body.classList.add('fade-out');

      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });
});

// Hero Scroll Animation, Progress Bar, and Back to Top Button
const backToTopButton = document.querySelector(".back-to-top");
window.addEventListener('scroll', () => {
  // Progress Bar
  let scroll = document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let progress = (scroll / height) * 100;
  const progressBar = document.getElementById('progressBar');
  if(progressBar) {
    progressBar.style.width = progress + '%';
  }


  // Hero Scroll
  const hero = document.querySelector('.hero');
  if (hero) {
    if (window.scrollY > 100) {
      hero.classList.add('scrolled');
    } else {
      hero.classList.remove('scrolled');
    }
  }

  // Back to top button
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Chatbot
const chatbotWindow = document.getElementById("chatbot-window");
const chatbotFab = document.getElementById("chatbot-fab");

function toggleChatbot() {
  if (chatbotWindow.style.display === "flex") {
    chatbotWindow.style.display = "none";
    chatbotFab.style.display = "flex";
  } else {
    chatbotWindow.style.display = "flex";
    chatbotFab.style.display = "none";
  }
}

const chatbotMessages = document.getElementById("chatbot-messages");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotSend = document.getElementById("chatbot-send");

const API_KEY = "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";
const API_ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

async function sendMessage(message) {
  if (!message.trim()) return;
  addUserMessage(message);
  chatbotInput.value = "";

  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    const botMessage = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't understand that.";
    addBotMessage(botMessage);
  } catch (error) {
    console.error(error);
    addBotMessage("Sorry, something went wrong. Please try again later.");
  }
}

function addUserMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", "user");
  messageElement.textContent = message;
  chatbotMessages.appendChild(messageElement);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function addBotMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", "bot");
  messageElement.textContent = message;
  chatbotMessages.appendChild(messageElement);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

chatbotSend.addEventListener("click", () => {
  const message = chatbotInput.value;
  sendMessage(message);
});

chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const message = chatbotInput.value;
    sendMessage(message);
  }
});
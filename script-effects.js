// Preloader
window.addEventListener('load', () => {
  document.getElementById('preloader').style.display = 'none';
});

// AOS initialization
AOS.init();

// Scroll Progress Bar
const progressBar = document.getElementById('progress-bar');
window.onscroll = () => {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  progressBar.style.width = scrolled + "%";
};

// Custom Cursor
const cursor = document.getElementById("cursor");
document.addEventListener("mousemove", e => {
  cursor.style.left = e.pageX + "px";
  cursor.style.top = e.pageY + "px";
});

// Toggle Menu
function toggleMenu() {
  const nav = document.getElementById("nav-menu");
  nav.classList.toggle("show");
}

// Particles JS
particlesJS.load('particles-js', 'particles.json', function() {
  console.log('callback - particles.js config loaded');
});

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

// Hero Scroll Animation & Header Shadow
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const header = document.querySelector('header');
  if (hero) {
    if (window.scrollY > 100) {
      hero.classList.add('scrolled');
    } else {
      hero.classList.remove('scrolled');
    }
  }
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
});

// Back to top button
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
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
const chatbotContainer = document.getElementById('chatbot-container');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const typingIndicator = document.getElementById('typing-indicator');

// --- IMPORTANT ---
// THE API KEY SHOULD BE STORED SECURELY ON A BACKEND SERVER.
// This is just a placeholder.
const API_KEY = 'YOUR_API_KEY';
const API_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

function toggleChatbot() {
  chatbotContainer.classList.toggle('show');
}

function addUserMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', 'user');
  messageElement.innerText = message;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addBotMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', 'bot');
  messageElement.innerText = message;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function setTyping(isTyping) {
    typingIndicator.style.display = isTyping ? 'flex' : 'none';
}

async function sendMessage() {
  const message = userInput.value.trim();
  if (message === '') return;

  userInput.value = '';
  addUserMessage(message);
  setTyping(true);

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    const botMessage = data.choices[0].message.content;
    addBotMessage(botMessage);

  } catch (error) {
    console.error('Chatbot error:', error);
    addBotMessage('Sorry, I am having trouble connecting. Please try again later.');
  } finally {
    setTyping(false);
  }
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

addBotMessage("Hello! I'm Krsna's Flute - your AI assistant. How can I help you today?");
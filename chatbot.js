(() => {
      const chatMessages = document.getElementById('chatMessages');
      const userInput = document.getElementById('userInput');
      const sendBtn = document.getElementById('sendBtn');
      const voiceBtn = document.getElementById('voiceBtn');
      const typingIndicator = document.getElementById('typingIndicator');
      const inputForm = document.getElementById('inputForm');

      const API_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';
      // IMPORTANT: Replace with your actual API key.
      // For security reasons, it's recommended to load the API key from a separate, git-ignored file.
      const API_KEY = 'YOUR_API_KEY';

      // Voice recognition setup
      let recognition;
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          userInput.value = transcript;
          userInput.focus();
          voiceBtn.classList.remove('text-red-500');
        };

        recognition.onerror = (event) => {
          console.error('Voice recognition error:', event.error);
          voiceBtn.classList.remove('text-red-500');
        };

        recognition.onend = () => {
          voiceBtn.classList.remove('text-red-500');
        };

        voiceBtn.addEventListener('click', () => {
          if (!voiceBtn.classList.contains('text-red-500')) {
            recognition.start();
            voiceBtn.classList.add('text-red-500');
          }
        });
      } else {
        voiceBtn.disabled = true;
        voiceBtn.title = 'Voice input not supported';
      }

      // Escape HTML to prevent injection
      function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML.replace(/\n/g, '<br>');
      }

      // Scroll chat to bottom
      function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }

      // Add message with typing animation for bot
      async function addBotMessage(text) {
        const messageEl = document.createElement('article');
        messageEl.classList.add('message', 'bot');
        messageEl.setAttribute('role', 'article');
        messageEl.setAttribute('aria-label', "Krishna's Flute message");

        const header = document.createElement('div');
        header.className = 'header';
        header.innerHTML = '<i class="fas fa-robot"></i> Krishna\'s Flute';
        messageEl.appendChild(header);

        const content = document.createElement('div');
        content.className = 'message-content';
        messageEl.appendChild(content);

        chatMessages.appendChild(messageEl);
        scrollToBottom();

        // Typewriter effect
        for (let i = 0; i < text.length; i++) {
          content.innerHTML += escapeHtml(text.charAt(i));
          scrollToBottom();
          await new Promise((r) => setTimeout(r, 15 + Math.random() * 15));
        }
      }

      // Add user message instantly
      function addUserMessage(text) {
        const messageEl = document.createElement('article');
        messageEl.classList.add('message', 'user');
        messageEl.setAttribute('role', 'article');
        messageEl.setAttribute('aria-label', 'User message');
        messageEl.textContent = text;
        chatMessages.appendChild(messageEl);
        scrollToBottom();
      }

      // Show/hide typing indicator
      function setTyping(isTyping) {
        typingIndicator.style.display = isTyping ? 'flex' : 'none';
      }

      // Send message to API
      async function sendMessage(message) {
        if (!message.trim()) return;
        addUserMessage(message);
        setTyping(true);

        try {
          const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
              model: 'openai/gpt-3.5-turbo',
              messages: [{ role: 'user', content: message }],
              max_tokens: 150,
              temperature: 0.7,
            }),
          });

          if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
          }

          const data = await response.json();
          const botMessage = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't understand that.";
          await addBotMessage(botMessage);
        } catch (error) {
          console.error(error);
          await addBotMessage('Sorry, something went wrong. Please try again later.');
        } finally {
          setTyping(false);
        }
      }

      // Form submit handler
      inputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = userInput.value;
        userInput.value = '';
        sendMessage(message);
      });

      // Initial welcome message
      addBotMessage("Hello! I'm Krsna's Flute - your AI assistant. How can I help you today?");
    })();

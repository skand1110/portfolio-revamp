document.addEventListener("DOMContentLoaded", () => {
  // Fade-in animation logic
  const fadeElems = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });

  fadeElems.forEach(el => observer.observe(el));

    // Icon and toggle logic
  const darkToggle = document.getElementById("dark-mode-toggle");
  const audioToggle = document.getElementById("play-audio");
  const darkIcon = darkToggle.querySelector("i");
  const audioIcon = audioToggle.querySelector("i");

  // Dark mode toggle with icon swap
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
      darkIcon.classList.replace("fa-moon", "fa-sun");
    } else {
      darkIcon.classList.replace("fa-sun", "fa-moon");
    }
  });

  // Audio toggle with icon swap
  let isSpeaking = false;
  let utterance = null;

  audioToggle.addEventListener("click", () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      isSpeaking = false;
      audioIcon.classList.replace("fa-volume-mute", "fa-volume-up");
      return;
    }

    const textToRead = document.body.innerText;
    utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'en-US';
    utterance.rate = 1;

    speechSynthesis.speak(utterance);
    isSpeaking = true;
    audioIcon.classList.replace("fa-volume-up", "fa-volume-mute");

    utterance.onend = () => {
      isSpeaking = false;
      audioIcon.classList.replace("fa-volume-mute", "fa-volume-up");
    };
  });

  // Chatbot logic
const chatToggle = document.getElementById("chat-toggle");
const chatWindow = document.getElementById("chat-window");
const chatClose = document.getElementById("chat-close");
const chatMessages = document.querySelector(".chat-messages");
const chatOptions = document.getElementById("chat-options");

function showInitialPrompt() {
  chatMessages.innerHTML = `<p>Hello! Who do I have the pleasure of chatting with today?</p>`;
  chatOptions.style.display = "block";
}

chatToggle.addEventListener("click", () => {
  chatWindow.classList.toggle("open");
  if (chatWindow.classList.contains("open")) {
    showInitialPrompt();
  }
});

chatClose.addEventListener("click", () => {
  chatWindow.classList.remove("open");
});

chatOptions.addEventListener("click", (e) => {
  if (e.target.classList.contains("chat-button")) {
    const role = e.target.dataset.role;
    let response = "";

    if (role === "recruiter") {
      response = `<p>Welcome, recruiter! Here's my <a href="assets/Skand_Sharma_Resume.pdf" 
      target="_blank">resume</a> and a quick look at my skills: product strategy, UX design, market research, and execution.</p>`;
      chatMessages.innerHTML = response;
      chatOptions.style.display = "none";

    } else if (role === "passerby") {
      // Set up interactive game
      chatMessages.innerHTML = `
        <p>Let's play a game of Two Truths and a Lie. Click on the one you think is the lie:</p>
        <ul class="game-options">
          <li data-truth="false">Skand has a green belt in Choi Kwang Do martial art</li>
          <li data-truth="true">Skand has a podcast where she reads Shakespeare's works</li>
          <li data-truth="true">Skand can identify all 196 UN recognised national flags</li>
        </ul>
      `;
      chatOptions.style.display = "none";

      // Add event listener to game options
      document.querySelector(".game-options").addEventListener("click", (event) => {
        if (event.target.tagName === "LI") {
          const isTruth = event.target.dataset.truth === "true";
          if (isTruth) {
            chatMessages.innerHTML = `<p>Whoopsie! That's actually true. But hey, great try! It was lovely meeting you — thanks for stopping by 😄</p>`;
          } else {
            chatMessages.innerHTML = `<p>🎉 Woah, you're correct! Nice catch. That one *was* the lie. Glad we met — thanks for popping in!</p>`;
          }
        }
      });
    } else {
      response = `<p>It was lovely meeting you. Thanks for stopping by!</p>`;
      chatMessages.innerHTML = response;
      chatOptions.style.display = "none";
    }
  }
});





});

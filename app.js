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

//chatbot code logic
const toggle = document.getElementById("chatbot-toggle");
const box = document.getElementById("chatbot-box");
const messages = document.getElementById("chatbot-messages");
const input = document.getElementById("chatbot-input");

toggle.addEventListener("click", () => {
  box.classList.toggle("hidden");
  if (!box.classList.contains("hidden") && messages.childNodes.length === 0) {
    addBotMessage("Hi there! Are you a recruiter, someone who knows me, or just browsing?");
  }
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const userText = input.value.trim().toLowerCase();
    if (!userText) return;
    addUserMessage(input.value);
    input.value = "";

    if (userText.includes("recruiter")) {
      addBotMessage("Awesome! Here's my resume: [link] and a quick summary of my skills...");
    } else if (userText.includes("know") || userText.includes("friend")) {
      addBotMessage("That's lovely! Want to leave a message for me? Type it below.");
      // Hook to send via EmailJS later
    } else {
      const funFacts = [
        "I once sold ₹12k worth of art in one month!",
        "I love writing poems and product essays.",
        "I build things that blend tech and creativity."
      ];
      const random = funFacts[Math.floor(Math.random() * funFacts.length)];
      addBotMessage(random);
    }
  }
});

function addBotMessage(msg) {
  const div = document.createElement("div");
  div.textContent = "🤖 " + msg;
  div.style.margin = "0.5rem 0";
  messages.appendChild(div);
}

function addUserMessage(msg) {
  const div = document.createElement("div");
  div.textContent = "🧑 " + msg;
  div.style.textAlign = "right";
  messages.appendChild(div);
}


});

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

  chatToggle.addEventListener("click", () => {
    chatWindow.classList.toggle("open");
    if (chatWindow.classList.contains("open")) {
      chatMessages.innerHTML = `<p>Hello! Who do I have the pleasure of chatting with today?</p>`;
      chatOptions.style.display = "block";
    }
  });

  chatClose.addEventListener("click", () => {
    chatWindow.classList.remove("open");
  });

  chatOptions.addEventListener("click", (e) => {
    if (e.target.classList.contains("chat-button")) {
      const role = e.target.dataset.role;

      if (role === "recruiter") {
        chatMessages.innerHTML += `<p>Welcome, recruiter! Here's my <a href="YOUR_RESUME_LINK" target="_blank">resume</a> and a quick look at my skills: product strategy, UX design, market research, and execution.</p>`;
      } else if (role === "passerby") {
        const facts = [
          "I once ran an art business that made ₹12K in a month!",
          "I'm a top Product Fellow from NextLeap.",
          "I'm obsessed with good UX and bad puns."
        ];
        const fact = facts[Math.floor(Math.random() * facts.length)];
        chatMessages.innerHTML += `<p>Hi there! Fun fact: ${fact}</p>`;
      } else {
        chatMessages.innerHTML += `<p>It was lovely meeting you. Thanks for stopping by!</p>`;
      }

      chatOptions.style.display = "none"; // Hide options after one use
    }
  });



});

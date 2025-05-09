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



});

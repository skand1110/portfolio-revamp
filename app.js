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

  // Dark mode toggle logic
  const toggle = document.getElementById("dark-mode-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }

  //audio play logic
  let isSpeaking = false;
  let utterance = null;
  
document.getElementById('play-audio').addEventListener('click', () => {
  if (isSpeaking) {
    speechSynthesis.cancel();
    isSpeaking = false;
    return;
  }

  const textToRead = document.body.innerText; // Or a specific element’s text
  utterance = new SpeechSynthesisUtterance(textToRead);
  utterance.lang = 'en-US';
  utterance.rate = 1;

  // Pick a specific voice 
  const voices = speechSynthesis.getVoices();
  const preferredVoice = voices.find(voice => voice.name.includes("Female") || voice.name.includes("Google US English"));

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  speechSynthesis.speak(utterance);
  isSpeaking = true;
  utterance.onend = () => {
    isSpeaking = false;
  };
});


});

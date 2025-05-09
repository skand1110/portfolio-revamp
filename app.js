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
  document.getElementById('play-audio').addEventListener('click', () => {
  const content = document.body.innerText; 
  const utterance = new SpeechSynthesisUtterance(content);
  utterance.lang = 'en-US'; 
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
});

});

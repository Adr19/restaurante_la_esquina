// =============================
// /js/fadeSections.js
// Efecto fade-in al hacer scroll para secciones .fade
// =============================

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".fade");
  if (!sections.length) return;

  const options = {
    threshold: 0.15, // Se activa cuando el 15% del elemento es visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Solo animar una vez
      }
    });
  }, options);

  sections.forEach(section => observer.observe(section));
});

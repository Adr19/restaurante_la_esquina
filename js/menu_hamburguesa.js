document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');

    toggleBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      toggleBtn.classList.toggle('open'); // cambia a "X"
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        toggleBtn.classList.remove('open');
      });
    });
  });
// =============================
// /js/bannerScroll.js
// Controla el comportamiento del banner superior al hacer scroll
// =============================

document.addEventListener('DOMContentLoaded', () => {
  const banner = document.querySelector('.banner-formacion');
  if (!banner) return;

  // --- CONFIGURACIÓN ---
  const ACTIVATE_Y = 80;   // Al pasar más de 80px hacia abajo → minimizar
  const DEACTIVATE_Y = 40; // Al subir por debajo de 40px → restaurar

  let ticking = false;

  // --- FUNCIÓN PRINCIPAL ---
  const check = () => {
    const y = window.scrollY;

    if (y <= DEACTIVATE_Y) {
      banner.classList.remove('minimized');
    } else if (y >= ACTIVATE_Y) {
      banner.classList.add('minimized');
    }
    ticking = false;
  };

  // --- CONTROL SCROLL ---
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(check);
      ticking = true;
    }
  };

  // --- ESTADO INICIAL ---
  const init = () => {
    // Esperamos un frame para evitar falsos positivos cuando la página carga
    requestAnimationFrame(() => {
      const y = window.scrollY;
      if (y >= ACTIVATE_Y) {
        banner.classList.add('minimized');
      } else {
        banner.classList.remove('minimized');
      }
    });
  };

  // --- EVENTOS ---
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', init);

  // --- CORRECCIÓN EXTRA ---
  // En algunos navegadores el scrollY puede no ser 0 justo al cargar,
  // así que forzamos el estado correcto tras un breve retardo.
  window.addEventListener('load', () => {
    setTimeout(() => {
      if (window.scrollY <= DEACTIVATE_Y) {
        banner.classList.remove('minimized');
      }
    }, 100);
  });

  // --- INICIALIZAR ---
  init();
});

// ===============================
//  STICKY HEADER GLOBAL (mejorado)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");

  if (header) {
    // Función que ajusta el padding-top según la altura actual del header
    const updateBodyPadding = () => {
      document.body.style.paddingTop = `${header.offsetHeight}px`;
    };

    // Ejecutar al inicio
    updateBodyPadding();

    // Añadir scroll listener
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }

      // Vuelve a recalcular el padding dinámicamente
      updateBodyPadding();
    });

    // También recalcula si cambia el tamaño de la ventana
    window.addEventListener("resize", updateBodyPadding);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll(".portfolio-seccion");

  secciones.forEach((seccion) => {
    const galeria = seccion.querySelector(".galeria-carrusel");
    const imgs = galeria ? galeria.querySelectorAll("img") : [];
    const btnPrev = seccion.querySelector(".carousel-btn.prev");
    const btnNext = seccion.querySelector(".carousel-btn.next");

    if (!galeria || imgs.length === 0 || !btnPrev || !btnNext) return;

    let index = 0;
    imgs[index].classList.add("active");

    const updateGallery = () => {
      imgs.forEach((img, i) => {
        img.classList.toggle("active", i === index);
      });
    };

    btnNext.addEventListener("click", () => {
      index = (index + 1) % imgs.length;
      updateGallery();
    });

    btnPrev.addEventListener("click", () => {
      index = (index - 1 + imgs.length) % imgs.length;
      updateGallery();
    });
  });
});

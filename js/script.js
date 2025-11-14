// =====================================================
//  JS UNIFICADO – Todos tus módulos combinados en un solo archivo
//  Ordenado, sin redundancias, sin conflictos
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

  // =====================================================
  // 1) BANNER SCROLL (banner_formacion_scroll.js)
  // =====================================================
  (() => {
    const banner = document.querySelector('.banner-formacion');
    if (!banner) return;

    const ACTIVATE_Y = 80;
    const DEACTIVATE_Y = 40;

    let ticking = false;

    const check = () => {
      const y = window.scrollY;

      if (y <= DEACTIVATE_Y) {
        banner.classList.remove('minimized');
      } else if (y >= ACTIVATE_Y) {
        banner.classList.add('minimized');
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(check);
        ticking = true;
      }
    };

    const init = () => {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y >= ACTIVATE_Y) {
          banner.classList.add('minimized');
        } else {
          banner.classList.remove('minimized');
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', init);

    window.addEventListener('load', () => {
      setTimeout(() => {
        if (window.scrollY <= DEACTIVATE_Y) {
          banner.classList.remove('minimized');
        }
      }, 100);
    });

    init();
  })();

  // =====================================================
  // 2) FADE SECTIONS (fadeSections.js)
  // =====================================================
  (() => {
    const sections = document.querySelectorAll(".fade");
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    sections.forEach(section => observer.observe(section));
  })();

  // =====================================================
  // 3) MENU FIJO / STICKY HEADER (menu_fijo.js)
  // =====================================================
  (() => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    const updateBodyPadding = () => {
      document.body.style.paddingTop = `${header.offsetHeight}px`;
    };

    updateBodyPadding();

    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
      updateBodyPadding();
    });

    window.addEventListener("resize", updateBodyPadding);
  })();

  // =====================================================
  // 4) MENÚ HAMBURGUESA (menu_hamburguesa.js)
  // =====================================================
  (() => {
    const toggleBtn = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    if (!toggleBtn || !nav) return;

    toggleBtn.addEventListener('click', () => {
      nav.classList.toggle('active');
      toggleBtn.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        toggleBtn.classList.remove('open');
      });
    });
  })();

  // =====================================================
  // 5) PORTFOLIO CAROUSEL (portfolioCarousel.js)
  // =====================================================
  (() => {
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
  })();

  // =====================================================
  // 6) VALIDACIONES FORMULARIO (validaciones_formulario.js)
  // =====================================================
  (() => {
    const form = document.getElementById("form-contacto");
    if (!form) return;

    const campos = {
      nombre: {
        elemento: document.getElementById("nombre"),
        validar: v => v.trim().length >= 3,
        mensaje: "El nombre debe tener al menos 3 caracteres."
      },
      email: {
        elemento: document.getElementById("email"),
        validar: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        mensaje: "Introduce un correo electrónico válido."
      },
      telefono: {
        elemento: document.getElementById("telefono"),
        validar: v => /^[0-9]{9,15}$/.test(v),
        mensaje: "El teléfono debe contener entre 9 y 15 números."
      },
      tema: {
        elemento: document.getElementById("tema"),
        validar: v => v !== "",
        mensaje: "Selecciona un tema."
      },
      asunto: {
        elemento: document.getElementById("asunto"),
        validar: v => v.trim().length >= 3,
        mensaje: "El asunto debe tener al menos 3 caracteres."
      },
      mensaje: {
        elemento: document.getElementById("mensaje"),
        validar: v => v.trim().length >= 10,
        mensaje: "El mensaje debe tener al menos 10 caracteres."
      }
    };

    Object.values(campos).forEach(c => {
      const errorDiv = document.createElement("small");
      errorDiv.classList.add("mensaje-error");
      errorDiv.style.color = "red";
      errorDiv.style.display = "none";
      c.elemento.parentNode.appendChild(errorDiv);
      c.errorDiv = errorDiv;

      c.elemento.addEventListener("input", () => validarCampo(c));
    });

    function validarCampo(campo) {
      const valor = campo.elemento.value;

      if (!campo.validar(valor)) {
        campo.elemento.style.borderColor = "red";
        campo.errorDiv.textContent = campo.mensaje;
        campo.errorDiv.style.display = "block";
        return false;
      }

      campo.elemento.style.borderColor = "#0a9928";
      campo.errorDiv.style.display = "none";
      return true;
    }

    form.addEventListener("submit", (e) => {
      let valido = true;

      Object.values(campos).forEach(campo => {
        if (!validarCampo(campo)) valido = false;
      });

      if (!valido) {
        e.preventDefault();
        alert("Por favor corrige los campos marcados en rojo antes de enviar ❗");
      } else {
        alert("Formulario enviado correctamente ✔️");
      }
    });
  })();

}); // FIN DOMContentLoaded

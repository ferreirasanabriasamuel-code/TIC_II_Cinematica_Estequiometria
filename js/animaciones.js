/* ============================================================================
   animaciones.js — Orquestador de la capa de movimiento
   ----------------------------------------------------------------------------
   Complemento de css/animaciones.css. Todo es JavaScript puro, sin
   dependencias, y todo se degrada bien: si este archivo no corre, el sitio
   se ve y funciona exactamente como antes.

   Responsabilidades:
     1. Scroll reveal: los elementos con data-reveal aparecen con
        fade-in + translateY(18px) al entrar en el viewport
        (IntersectionObserver). Los grupos de hermanos (cards de una
        rejilla, textos de la portada) reciben un stagger de 90 ms por
        lote. Al terminar la transición se retira el atributo para que
        los estados hover vuelvan a controlar el transform.
     2. Encabezados: al superar ~50 px de scroll, la barra gana la clase
        --desplazada (backdrop-filter: blur(10px) + sombra ligera).
        Vigila el masthead de la portada (ventana), las barras de los
        paneles (el panel es el contenedor de scroll en escritorio; la
        ventana, en celular) y la barra de las páginas de juego.
     3. Carga de imágenes: cada <img> se marca .imagen-fade y pasa a
        .imagen-cargada al terminar de cargar (blur-up suave).
     4. Fondo PlasmaWave de la portada: si están cargados React y
        js/plasma-wave-react.js, la onda de luz (react-bits, WebGL2) se
        monta como COMPONENTE REACT (window.PlasmaWaveReact, con la
        configuración y la pausa como props); si no, cae a un fondo
        estático en CSS. Se pausa mientras hay un panel abierto; la
        propia onda se frena cuando la pestaña se oculta o sale de
        pantalla.
   ========================================================================== */

(function () {
  'use strict';

  /* Se marca cuanto antes: los estilos de reveal solo aplican con JS
     activo (sin él, nada queda oculto). */
  document.documentElement.classList.add('animaciones-activas');

  const reducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const RETARDO_ESCALONADO = 90;      /* ms entre hermanos (80-120)   */
  const MAXIMO_ESCALONADO = 7;        /* tope del escalón del lote    */
  const UMBRAL_CABECERA = 50;         /* px de scroll (pedidos: ~50)  */

  function $(selector, contexto) {
    return (contexto || document).querySelector(selector);
  }

  function $$(selector, contexto) {
    return Array.prototype.slice.call((contexto || document).querySelectorAll(selector));
  }

  /* ======================= 1. Scroll reveal ============================== */

  function etiquetarRevelados() {
    /* Textos de las dos mitades de la portada: cada bloque entra en
       cascada (etiqueta → título → bajada → botón). */
    $$('.mitad-contenido > *').forEach(function (elemento) {
      if (!elemento.hasAttribute('data-reveal')) {
        elemento.setAttribute('data-reveal', '');
      }
    });

    /* Páginas de juego: título, descripción y zona del juego. */
    $$('.juego-titulo, .juego-descripcion, .juego-zona').forEach(function (elemento) {
      if (!elemento.hasAttribute('data-reveal')) {
        elemento.setAttribute('data-reveal', '');
      }
    });
  }

  function soltarRevelado(elemento) {
    elemento.removeAttribute('data-reveal');
    elemento.classList.remove('reveal-visible');
    elemento.style.removeProperty('--reveal-delay');
  }

  function programarLiberacion(elemento, retardo) {
    const yaLiberado = elemento.__reveladoLiberado;
    if (yaLiberado) return;
    elemento.__reveladoLiberado = true;

    window.setTimeout(function () {
      soltarRevelado(elemento);
      delete elemento.__reveladoLiberado;
    }, retardo + 750);
  }

  function revelar(elementos) {
    /* Escalona por lote: los que entran juntos se separan 90 ms, según
       su posición vertical, sin importar cuándo entró cada uno. */
    elementos
      .filter(function (elemento) { return !elemento.classList.contains('reveal-visible'); })
      .sort(function (a, b) {
        return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
      })
      .forEach(function (elemento, indice) {
        const retardo = Math.min(indice, MAXIMO_ESCALONADO) * RETARDO_ESCALONADO;
        elemento.style.setProperty('--reveal-delay', retardo + 'ms');
        elemento.classList.add('reveal-visible');
        if (observador) observador.unobserve(elemento);
        programarLiberacion(elemento, retardo);
      });
  }

  let observador = null;

  function conectarRevelado() {
    etiquetarRevelados();

    const objetivos = $$('[data-reveal]');
    if (!objetivos.length) return;

    if (reducido || !('IntersectionObserver' in window)) {
      /* Sin animación: todo visible de inmediato */
      objetivos.forEach(function (elemento) {
        elemento.style.setProperty('--reveal-delay', '0ms');
        elemento.classList.add('reveal-visible');
      });
      return;
    }

    observador = new IntersectionObserver(function (entradas) {
      const visibles = entradas.filter(function (entrada) {
        return entrada.isIntersecting;
      }).map(function (entrada) { return entrada.target; });
      if (visibles.length) revelar(visibles);
    }, {
      threshold: 0.06,
      rootMargin: '0px 0px -7% 0px',
    });

    objetivos.forEach(function (elemento) { observador.observe(elemento); });
  }


  /* ================= 2. Encabezados al hacer scroll ====================== */

  const esEscritorio = window.matchMedia('(min-width: 960px)');

  function alternarClase(elemento, condicion) {
    if (!elemento) return;
    elemento.classList.toggle('panel-barra--desplazada',
      condicion && elemento.classList.contains('panel-barra'));
    elemento.classList.toggle('juego-cabecera--desplazada',
      condicion && elemento.classList.contains('juego-cabecera'));
    elemento.classList.toggle('portada-cabecera--desplazada',
      condicion && elemento.classList.contains('portada-cabecera'));
  }

  function alDesplazar() {
    const scrollVentana = window.scrollY || window.pageYOffset || 0;

    /* Masthead de la portada y barra de juego: la ventana es su scroll */
    alternarClase($('.portada-cabecera'), scrollVentana > UMBRAL_CABECERA);
    alternarClase($('.juego-cabecera'), scrollVentana > UMBRAL_CABECERA);

    /* Barras de los paneles: en escritorio el panel es el contenedor de
       scroll; en celular el panel está en el flujo y se mira la ventana. */
    $$('.panel-barra').forEach(function (barra) {
      if (!esEscritorio.matches) {
        alternarClase(barra, scrollVentana > UMBRAL_CABECERA);
        return;
      }
      const panel = barra.closest('.panel');
      const scrolled = panel && panel.scrollTop > UMBRAL_CABECERA;
      alternarClase(barra, scrolled);
    });
  }

  let marcoPendiente = false;

  function alDesplazarPerezoso() {
    if (marcoPendiente) return;
    marcoPendiente = true;
    window.requestAnimationFrame(function () {
      marcoPendiente = false;
      alDesplazar();
    });
  }

  function conectarCabeceras() {
    window.addEventListener('scroll', alDesplazarPerezoso, { passive: true });
    $$('.panel').forEach(function (panel) {
      panel.addEventListener('scroll', alDesplazarPerezoso, { passive: true });
    });
    if ('matchMedia' in window && esEscritorio.addEventListener) {
      esEscritorio.addEventListener('change', alDesplazar);
    }
    alDesplazar();
  }


  /* ==================== 3. Carga de imágenes (blur-up) =================== */

  function prepararImagen(img) {
    if (img.__fadePreparada) return;
    img.__fadePreparada = true;

    img.classList.add('imagen-fade');

    function cargada() {
      img.removeEventListener('load', cargada);
      img.removeEventListener('error', fallo);
      window.requestAnimationFrame(function () {
        img.classList.add('imagen-cargada');
      });
    }

    function fallo() {
      img.removeEventListener('load', cargada);
      img.removeEventListener('error', fallo);
      img.classList.remove('imagen-fade');
      img.classList.remove('imagen-cargada');
    }

    img.addEventListener('load', cargada);
    img.addEventListener('error', fallo);

    if (img.complete) {
      if (img.naturalWidth > 0) cargada();
      else fallo();
    }
  }

  function conectarImagenes() {
    Array.prototype.forEach.call(document.images, prepararImagen);
  }


  /* ====================== 4. Fondo PlasmaWave (React) ==================== */
  /* La onda de luz PlasmaWave (react-bits) dibujada con WebGL2. La
     configuración es la pedida: violeta y cian (#A855F7 / #06B6D4), brillo
     y núcleo completos, grano sutil, interacción con el cursor y animación
     de entrada. Fuera del haz la onda es transparente (lightMode false,
     como se pidió): flota sobre el papel crema en claro y sobre la noche
     del sitio en oscuro.

     Montaje: el fondo es un COMPONENTE REACT (js/plasma-wave-react.js,
     React 18 vendido en js/react/, sin paso de build). Si React no cargó
     (p. ej. sin conexión la primera vez), el ancla muestra el fondo
     estático en CSS de reserva (css/plasma-wave.css).  */

  const PLASMA_PROPS = {
    colors: ['#A855F7', '#06B6D4'],
    speed: 1,
    speed1: 0.05,
    speed2: 0.05,
    dir2: 1,
    bend1: 1,
    bend2: 0.5,
    thickness: 0.3,
    focalLength: 1.25,
    rotationDeg: 0,
    brightness: 1,
    glow: 1,
    core: 0.6,
    grain: 0.03,
    quality: 1,
    mouseInteraction: true,
    intro: true,
    fade: 0,
    opacity: 1,
    lightMode: false,
  };

  let fondo = null;   /* controlador del fondo (React o respaldo estático) */

  function montarFondo() {
    const portada = $('.portada');
    if (!portada) return;

    /* El ancla de React es un div VACÍO aparte (createRoot toma el control
       de su contenedor y borra lo que hubiera dentro: no puede ser
       .portada). Queda fija detrás de todo el contenido de la portada. */
    const ancla = document.createElement('div');
    ancla.id = 'fondo-portada';
    portada.insertBefore(ancla, portada.firstChild);

    if (window.PlasmaWaveReact) {
      /* Camino React: el componente posee el canvas WebGL y su bucle de
         render; la configuración y la pausa viajan como props. */
      fondo = window.PlasmaWaveReact.montar(ancla, PLASMA_PROPS);
    } else {
      /* Respaldo sin React (p. ej. js/react/ no disponible): un fondo
         estático en CSS con los mismos colores, sin animación. */
      ancla.className = 'fondo-plasma--estatico';
      fondo = {
        actualizar: function () {},
        destruir: function () {},
      };
    }

    /* Con un panel abierto el fondo queda tapado: pausa para ahorrar
       (la prop paused congela el tiempo de la onda). */
    const observerPanel = new MutationObserver(function () {
      if (!fondo) return;
      fondo.actualizar({
        paused: portada.classList.contains('portada--con-panel'),
      });
    });
    observerPanel.observe(portada, { attributes: true, attributeFilter: ['class'] });
  }


  /* ============================ arranque ================================= */
  /* Este script se carga al final (defer): principal.js ya construyó los
     paneles cuando corre este DOMContentLoaded.                            */

  document.addEventListener('DOMContentLoaded', function () {
    conectarRevelado();
    conectarCabeceras();
    conectarImagenes();
    montarFondo();
  });

  /* Imágenes que aparezcan más tarde (p. ej. al completar js/datos.js
     dentro de una visita ya cargada) también reciben el blur-up. */
  if ('MutationObserver' in window) {
    const observerImagenes = new MutationObserver(function (mutaciones) {
      mutaciones.forEach(function (mutacion) {
        Array.prototype.forEach.call(mutacion.addedNodes || [], function (nodo) {
          if (nodo.nodeType !== 1) return;
          if (nodo.tagName === 'IMG') prepararImagen(nodo);
          if (nodo.querySelectorAll) {
            Array.prototype.forEach.call(nodo.querySelectorAll('img'), prepararImagen);
          }
        });
      });
    });
    document.addEventListener('DOMContentLoaded', function () {
      observerImagenes.observe(document.body, { childList: true, subtree: true });
    });
  }

}());

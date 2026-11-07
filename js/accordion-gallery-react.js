/* ============================================================================
   accordion-gallery-react.js — Galería acordeón del banco de imágenes
   ----------------------------------------------------------------------------
   Portado del componente «AccordionGallery» de react-bits (JS + CSS) a una
   isla React sin JSX, con la misma API de props y el mismo comportamiento
   (timeline de GSAP, ResizeObserver, hover/clic/foco/teclado, respeto a
   prefers-reduced-motion). GSAP va vendido en js/gsap.min.js y React 18 en
   js/react/, así que no hay CDN ni paso de build.

   Adaptación del sitio: se quitó la capa de velo oscuro del componente
   original (el degradado inferior hacia #060010 y el oscurecido constante
   del 35 %), así que las fotos se muestran con su color natural. Se conserva
   la interacción del acordeón: el panel activo va a color y los inactivos,
   en escala de grises.

   Solo lo usan los paneles: js/principal.js deja un ancla
   <div class="banco-acordeon" data-banco-acordeon data-tema="..."> en la
   sección «Banco de imágenes» de cada tema y este archivo monta ahí una
   instancia con las imágenes de DATOS.temas[tema].bancoImagenes (solo las
   entradas con «archivo»). Si faltan React, GSAP o el ancla, el banco cae
   a la rejilla de marcos tradicional sin romper nada.
   ========================================================================== */

window.AccordionGalleryReact = (function () {
  'use strict';

  if (!window.React || !window.ReactDOM || !window.gsap) return null;

  const e = React.createElement;

  function AccordionGallery(props) {
    const items = props.items || [];
    const count = items.length;
    const defaultIndex = props.defaultIndex !== undefined ? props.defaultIndex : 2;
    const accentColor = props.accentColor || '#ffffff';
    const textColor = props.textColor || '#ffffff';
    const height = props.height !== undefined ? props.height : 460;
    const gap = props.gap !== undefined ? props.gap : 10;
    const radius = props.radius !== undefined ? props.radius : 16;
    const expandRatio = props.expandRatio !== undefined ? props.expandRatio : 0.52;
    const orientation = props.orientation || 'horizontal';
    const duration = props.duration !== undefined ? props.duration : 0.6;
    const ease = props.ease || 'power3.out';
    const parallax = props.parallax !== undefined ? props.parallax : 0.5;
    const tilt = props.tilt !== undefined ? props.tilt : 8;
    const stagger = props.stagger !== undefined ? props.stagger : 0.06;
    const trigger = props.trigger || 'hover';
    const showLabels = props.showLabels !== undefined ? props.showLabels : true;
    const grayscale = props.grayscale !== undefined ? props.grayscale : true;
    const className = props.className || '';

    const rootRef = React.useRef(null);
    const panelRefs = React.useRef([]);
    const mediaRefs = React.useRef([]);
    const barRefs = React.useRef([]);
    const textRefs = React.useRef([]);
    const tlRef = React.useRef(null);
    const firstRunRef = React.useRef(true);
    const mediaSizeRef = React.useRef(320);

    const vertical = orientation === 'vertical';
    const [active, setActive] = React.useState(
      Math.min(Math.max(defaultIndex, 0), count - 1)
    );

    const prefersReduced =
      typeof window !== 'undefined' && window.matchMedia
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    const applyLayout = React.useCallback(
      function (animate) {
        const panels = panelRefs.current;
        if (!panels.length) return;

        const r = Math.min(Math.max(expandRatio, 0.2), 0.9);
        const grow = count > 1 ? (r * (count - 1)) / (1 - r) : 1;
        const mediaSize = mediaSizeRef.current;

        if (tlRef.current) tlRef.current.kill();
        const dur = animate && !prefersReduced ? duration : 0;
        const tl = gsap.timeline();

        panels.forEach(function (panel, i) {
          if (!panel) return;
          const isActive = i === active;
          const media = mediaRefs.current[i];
          const bar = barRefs.current[i];
          const text = textRefs.current[i];

          const rot = isActive ? 0 : i < active ? tilt : -tilt;
          const rotProp = vertical ? { rotateX: -rot } : { rotateY: rot };

          tl.to(panel, Object.assign(
            { flexGrow: isActive ? grow : 1, duration: dur, ease: ease },
            rotProp
          ), 0);

          if (media) {
            const drift = Math.max(-1.5, Math.min(1.5, active - i));
            const shift = drift * parallax * mediaSize * 0.06;
            const gray = grayscale ? (isActive ? 0 : 1) : 0;
            tl.to(media, {
              xPercent: -50,
              yPercent: -50,
              x: vertical ? 0 : (isActive ? 0 : shift),
              y: vertical ? (isActive ? 0 : shift) : 0,
              '--ag-gray': gray,
              duration: dur,
              ease: ease
            }, 0);
          }

          if (showLabels && bar && text) {
            if (isActive) {
              tl.to([bar, text], {
                opacity: 1, x: 0, duration: dur, ease: ease,
                stagger: prefersReduced ? 0 : stagger
              }, 0);
            } else {
              tl.to([bar, text], { opacity: 0, x: -14, duration: dur * 0.6, ease: ease }, 0);
            }
          }
        });

        tlRef.current = tl;
      },
      [active, count, expandRatio, duration, ease, vertical, tilt, parallax,
        grayscale, showLabels, stagger, prefersReduced]
    );

    /* Medición del ancho real: define el tamaño del medio para el parallax */
    React.useEffect(function () {
      const el = rootRef.current;
      if (!el) return;

      const measure = function () {
        const rect = el.getBoundingClientRect();
        const total = vertical ? rect.height : rect.width;
        const usable = Math.max(total - gap * (count - 1), 120);
        const size = Math.max(140, usable * Math.min(Math.max(expandRatio, 0.2), 0.9) * 1.22);
        mediaSizeRef.current = size;
        el.style.setProperty('--ag-media-size', size + 'px');
        applyLayout(!firstRunRef.current);
      };

      measure();
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return function () { ro.disconnect(); };
    }, [applyLayout, gap, count, expandRatio, vertical]);

    React.useEffect(function () {
      applyLayout(!firstRunRef.current);
      firstRunRef.current = false;
    }, [applyLayout]);

    React.useEffect(function () {
      return function () {
        if (tlRef.current) tlRef.current.kill();
      };
    }, []);

    const handleEnter = function (i) {
      if (trigger === 'hover') setActive(i);
    };

    const handleClick = function (i, ev) {
      if (i !== active) ev.preventDefault();
      setActive(i);
    };

    const handleKeyDown = function (i, ev) {
      if (ev.key === 'ArrowRight' || ev.key === 'ArrowDown') {
        ev.preventDefault();
        setActive((i + 1) % count);
      } else if (ev.key === 'ArrowLeft' || ev.key === 'ArrowUp') {
        ev.preventDefault();
        setActive((i - 1 + count) % count);
      }
    };

    const hijos = items.map(function (item, i) {
      const isActive = i === active;
      const Tag = item.link ? 'a' : 'div';
      return e(Tag, {
        key: i,
        ref: function (el) { panelRefs.current[i] = el; },
        className: 'ag-panel' + (isActive ? ' ag-panel--active' : ''),
        style: { borderRadius: radius + 'px' },
        href: item.link || undefined,
        onClick: function (ev) { handleClick(i, ev); },
        onMouseEnter: function () { handleEnter(i); },
        onFocus: function () { setActive(i); },
        onKeyDown: function (ev) { handleKeyDown(i, ev); },
        role: 'listitem',
        tabIndex: 0,
        'aria-current': isActive ? 'true' : undefined,
        'aria-label': item.label
      },
        e('span', { className: 'ag-panel__frame' },
          e('span', { className: 'ag-panel__media', ref: function (el) { mediaRefs.current[i] = el; } },
            e('img', { src: item.image, alt: item.alt || item.label || '', draggable: false })
          )
        ),
        showLabels
          ? e('span', { className: 'ag-panel__label', 'aria-hidden': 'true' },
              e('span', { className: 'ag-panel__bar', ref: function (el) { barRefs.current[i] = el; } }),
              e('span', { className: 'ag-panel__text', ref: function (el) { textRefs.current[i] = el; } },
                item.label)
            )
          : null
      );
    });

    return e('div', {
      ref: rootRef,
      className: 'accordion-gallery' + (vertical ? ' accordion-gallery--vertical' : '') +
        (className ? ' ' + className : ''),
      style: {
        '--ag-accent': accentColor,
        '--ag-text': textColor,
        '--ag-gap': gap + 'px',
        '--ag-radius': radius + 'px',
        height: (vertical ? Math.round(height * 1.6) : height) + 'px'
      },
      role: 'list',
      'aria-label': 'Image accordion gallery'
    }, hijos);
  }

  /* Monta una instancia por cada ancla [data-banco-acordeon] que dejo
     js/principal.js, tomando las imágenes de js/datos.js. */
  const raices = [];

  function montar() {
    if (!window.DATOS || !window.DATOS.temas) return;
    const anclas = document.querySelectorAll('[data-banco-acordeon]');
    anclas.forEach(function (ancla) {
      const tema = window.DATOS.temas[ancla.getAttribute('data-tema')];
      const banco = (tema && tema.bancoImagenes) || [];
      const items = [];
      banco.forEach(function (imagen, i) {
        if (!imagen.archivo) return;
        items.push({
          image: imagen.archivo,
          label: imagen.titulo || ('Imagen ' + String(i + 1).padStart(2, '0')),
          alt: imagen.descripcion,
          link: ''
        });
      });
      if (items.length < 2) return;

      const raiz = ReactDOM.createRoot(ancla);
      raices.push(raiz);
      raiz.render(e(AccordionGallery, {
        items: items,
        defaultIndex: 2,
        accentColor: '#ffffff',
        textColor: '#ffffff',
        height: 460,
        gap: 10,
        radius: 16,
        expandRatio: 0.52,
        orientation: 'horizontal',
        duration: 0.6,
        ease: 'power3.out',
        parallax: 0.5,
        tilt: 8,
        stagger: 0.06,
        trigger: 'hover',
        grayscale: true,
        showLabels: true
      }));
    });
  }

  function desmontar() {
    raices.forEach(function (raiz) { raiz.unmount(); });
    raices.length = 0;
  }

  /* principal.js construye los paneles (y las anclas) dentro de
     DOMContentLoaded: montar recién después de ese evento, no durante la
     ejecución diferida de este guion. */
  if (document.readyState === 'complete') {
    montar();
  } else {
    document.addEventListener('DOMContentLoaded', montar);
  }

  return { AccordionGallery: AccordionGallery, montar: montar, desmontar: desmontar };
})();

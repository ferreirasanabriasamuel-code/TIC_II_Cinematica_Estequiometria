/* ============================================================================
   principal.js — Comportamiento de la portada y los paneles
   ----------------------------------------------------------------------------
   Se apoya en window.DATOS (js/datos.js) y se encarga de:

     1. Completar los textos de la portada (autores, curso, turno, bajadas).
     2. Construir el HTML de ambos paneles a partir del objeto de datos,
        con estructura vertical tipo stepper: barra superior, cabecera
        editorial y las nueve secciones numeradas (Introducción, Teoría,
        Material de lectura, Video educativo, Banco de imágenes, Actividades
        interactivas, Más información, Autoevaluación y Cierre).
     3. Barra superior del panel: flecha de vuelta, indicador "Paso X de 9"
        con línea de progreso, botón de guardar posición (localStorage),
        botón de menú que despliega el índice de secciones e interruptor
        de modo claro/oscuro.
     4. Reflejar el tema abierto en la URL (#cinematica / #estequiometria,
        y también secciones profundas como #cinematica-juegos), de modo que
        el botón "atrás" del navegador cierre el panel.
     5. Accesibilidad: mitades activables con Enter/Espacio, aria-expanded,
        anillo de foco, Esc para cerrar (primero el diálogo "Acerca", luego
        el menú, luego el panel) y foco devuelto a la mitad al cerrar.
     6. Ficha flotante "Sobre este proyecto" junto a la línea central y su
        diálogo "Conocer más" (contenido: DATOS.acercaDe y DATOS.meta).
     7. Interruptor de modo claro/oscuro en la portada y en las barras de
        los paneles (paleta: css/modo-oscuro.css · lógica: js/modo.js).
   ========================================================================== */

(function () {
  'use strict';

  const TEMAS = ['cinematica', 'estequiometria'];
  const DATOS = window.DATOS;

  /* Las nueve secciones del panel, en orden (stepper). El orden sigue el
     mapa de la guía de TIC II: lectura → video → imágenes → actividades →
     complementarios (dentro de "Más información") → autoevaluación. */
  const SECCIONES = [
    ['introduccion', 'Introducción'],
    ['teoria', 'Teoría'],
    ['lectura', 'Lectura'],
    ['video', 'Video'],
    ['imagenes', 'Imágenes'],
    ['juegos', 'Juegos'],
    ['mas', 'Más info'],
    ['autoevaluacion', 'Autoevaluación'],
    ['cierre', 'Cierre'],
  ];

  /* Clave de localStorage para "guardar posición" */
  const CLAVE_POSICION = 'tp-ciencias-posicion';

  /* ----------------------------- utilidades ----------------------------- */

  function $(selector, contexto) {
    return (contexto || document).querySelector(selector);
  }

  function $$(selector, contexto) {
    return Array.prototype.slice.call((contexto || document).querySelectorAll(selector));
  }

  /* Escapa texto plano antes de insertarlo en el HTML generado. */
  function esc(texto) {
    return String(texto).replace(/[&<>"']/g, function (caracter) {
      return {
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
      }[caracter];
    });
  }

  /* Detecta los marcadores pendientes del estilo [COMPLETAR: ...] */
  function esMarcador(valor) {
    return typeof valor === 'string' && valor.trim().indexOf('[COMPLETAR') === 0;
  }

  function reducirMovimiento() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function pad2(numero) {
    return (numero < 10 ? '0' : '') + numero;
  }

  /* ------------------- vidrio (GlassSurface, opcional) ------------------- */
  /* js/glass-surface-react.js (isla React) envuelve botones y banners en el
     vidrio GlassSurface de react-bits. vidriar() devuelve el botón REAL que
     queda dentro del vidrio (con los mismos atributos y contenido que el
     original) para colgarle los oyentes como siempre; sin React devuelve el
     mismo elemento y el sitio se ve exactamente como antes.                */

  const VIDRIO_ICONO = {
    clase: 'vidrio-icono',
    radio: 10,                       /* --radio-chico                        */
    opacidadFondo: 0.12,
    refraccion: false,               /* vidrio esmerilado: blur + sheen + rim */
  };

  /* Botones de color del tema (CTA y play): el tinte conserva el color que
     ya tenía el botón, ahora translúcido para que el vidrio se note. */
  function vidrioDeTema(porcentajeTinte, radio, clase) {
    return {
      clase: clase,
      radio: radio,
      tinte: 'color-mix(in srgb, var(--acento-oscuro) ' + porcentajeTinte + '%, transparent)',
      opacidadFondo: 0.12,
      refraccion: false,
    };
  }

  /* Píldora "Sobre este proyecto": vidrio con refracción (filtro SVG o
     WebGL con el canvas de la onda como backdrop), según el navegador. */
  const VIDRIO_PILDORA = {
    clase: 'vidrio-acercade',
    radio: 24,                       /* --radio-grande                       */
    desbordado: true,                /* el badge de ícono sobresale          */
    tinte: 'color-mix(in srgb, var(--acercade-fondo) 82%, transparent)',
    refraccion: true,
    renderer: 'auto',
    backdrop: {
      get current() {
        /* La onda se monta después (js/animaciones.js): se resuelve aquí
           cada vez que el componente la necesita, no al crear el vidrio. */
        if (!RESPALDO_ONDA.nodo || !RESPALDO_ONDA.nodo.isConnected) {
          RESPALDO_ONDA.nodo = document.querySelector('#fondo-portada canvas');
        }
        return RESPALDO_ONDA.nodo;
      },
    },
    distorsion: 0,
    desplazamiento: 0.5,
    opacidadFondo: 0.1,
    grosorBorde: 0.07,
    brillo: 50,
    opacidad: 0.93,
    desenfoque: 11,
    saturacion: 1,
    rojo: 41,
    verde: 10,
    azul: 20,
  };

  const RESPALDO_ONDA = { nodo: null };

  /* Diálogo "Conocer más": tarjeta esmerilada de alta opacidad para que el
     texto largo siga siendo legible sobre la página atenuada. */
  const VIDRIO_DIALOGO = {
    clase: 'vidrio-dialogo',
    radio: 24,
    opacidadFondo: 0.86,
    refraccion: false,
  };

  /* Chip "Jugar" de las tarjetas de actividades (paso 6): vidrio esmerilado
     con un tinte suave del tema. La tarjeta entera sigue siendo el enlace;
     el chip es presentación pura, sin oyentes propios. */
  const VIDRIO_JUGAR = {
    clase: 'vidrio-jugar',
    radio: 999,                      /* pastilla: el navegador la recorta a
                                        la mitad de la altura              */
    tinte: 'color-mix(in srgb, var(--acento-oscuro) 16%, transparent)',
    opacidadFondo: 0.12,
    refraccion: false,
  };

  function vidriar(elemento, opciones) {
    if (!elemento || !window.GlassUI || !window.GlassUI.vidriar) return elemento;
    try {
      return window.GlassUI.vidriar(elemento, opciones || {}) || elemento;
    } catch (error) {
      /* Cualquier falla del vidrio deja el botón original intacto */
      return elemento;
    }
  }

  /* ------------------------- íconos (trazo fino) ------------------------ */

  const SVG_VOLVER =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';

  const SVG_GUARDAR =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3.5h12v17l-6-4.5-6 4.5z"/></svg>';

  const SVG_MENU =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';

  /* Interruptor de modo: luna en claro, sol en oscuro (los dos íconos viven
     dentro del botón y css/modo-oscuro.css decide cuál se ve) */
  const SVG_LUNA =
    '<svg viewBox="0 0 24 24" class="icono-luna" aria-hidden="true">' +
      '<path d="M20 13.6A8 8 0 1 1 10.4 4a6.6 6.6 0 0 0 9.6 9.6z"/>' +
    '</svg>';

  const SVG_SOL =
    '<svg viewBox="0 0 24 24" class="icono-sol" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="4.2"/>' +
      '<path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5 5l1.9 1.9M17.1 17.1L19 19M19 5l-1.9 1.9M6.9 17.1L5 19"/>' +
    '</svg>';

  const SVG_CERRAR =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  const SVG_FLECHA =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* Enlace externo (material de lectura, Google Forms) */
  const SVG_EXTERNO =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" ' +
         'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M7 17L17 7M9 7h8v8"/>' +
    '</svg>';

  /* -------------------------------- estado ------------------------------- */

  let temaAbierto = null;    // null | 'cinematica' | 'estequiometria'
  let empujoHash = false;    // ¿la entrada actual del historial la agregó esta página?
  let mitadAEnfocar = null;  // mitad que recibe el foco al cerrarse el panel

  /* Diálogo "Acerca de este proyecto" (lo construye construirAcercade) */
  let dialogoAcercade = null;
  let cerrarDialogoAcercade = null;


  /* ======================= 1. Textos de la portada ======================= */

  function pintarPortada() {
    const meta = DATOS.meta;
    /* Nombres arriba y curso/turno abajo (dos renglones, el segundo en
       .portada-autores-curso como bloque). */
    $('#portada-autores').innerHTML =
      '<strong>' + esc(meta.integrantes.join(' e ')) + '</strong>' +
      '<span class="portada-autores-curso">' +
        esc(meta.curso) + ' · ' + esc(meta.turno) +
      '</span>';

    TEMAS.forEach(function (tema) {
      $('#bajada-' + tema).textContent = DATOS.temas[tema].bajada;
    });
  }


  /* ======================= 2. Construcción de paneles ==================== */

  function construirPaneles() {
    TEMAS.forEach(function (tema) {
      const panel = $('#panel-' + tema);
      panel.innerHTML = plantillaPanel(DATOS.temas[tema]);
      prepararPanel(panel, DATOS.temas[tema]);
    });
  }

  function plantillaPanel(d) {
    return (
      barraPanel(d) +
      cabeceraPanel(d) +
      '<div class="panel-cuerpo">' +
        seccionIntroduccion(d) +
        seccionTeoria(d) +
        seccionLectura(d) +
        seccionVideo(d) +
        seccionImagenes(d) +
        seccionJuegos(d) +
        seccionMas(d) +
        seccionAutoevaluacion(d) +
        seccionCierre(d) +
      '</div>'
    );
  }

  /* Barra superior fija (stepper): volver · paso X de 9 · guardar · menú ·
     interruptor de modo. Incluye la línea de progreso y el menú desplegable
     con el índice. */
  function barraPanel(d) {
    const items = SECCIONES.map(function (item, i) {
      return (
        '<a class="indice-enlace" href="#' + d.id + '-' + item[0] + '">' +
          '<span class="indice-num">' + pad2(i + 1) + '</span>' + item[1] +
        '</a>'
      );
    }).join('');

    return (
      '<div class="panel-barra">' +
        '<button class="panel-boton panel-volver" type="button" ' +
                'aria-label="Cerrar y volver a la portada">' + SVG_VOLVER + '</button>' +
        '<p class="panel-paso" aria-live="polite">' +
          '<span class="panel-paso-texto">Paso 1 de ' + SECCIONES.length + '</span>' +
          '<span class="panel-paso-nombre"> · ' + SECCIONES[0][1] + '</span>' +
        '</p>' +
        '<div class="panel-acciones">' +
          '<button class="panel-boton boton-guardar" type="button" ' +
                  'aria-label="Guardar la posición de lectura">' + SVG_GUARDAR + '</button>' +
          '<button class="panel-boton boton-menu" type="button" ' +
                  'aria-label="Abrir el índice de secciones" aria-expanded="false">' + SVG_MENU + '</button>' +
          '<button class="panel-boton interruptor-modo" type="button" ' +
                  'aria-pressed="' + (document.documentElement.getAttribute('data-modo') === 'oscuro') + '" ' +
                  'aria-label="Activar el modo oscuro">' + SVG_LUNA + SVG_SOL + '</button>' +
        '</div>' +
        '<span class="panel-progreso" aria-hidden="true"></span>' +
        '<nav class="panel-menu" hidden aria-label="Índice de secciones de ' + esc(d.titulo) + '">' +
          items +
        '</nav>' +
      '</div>'
    );
  }

  /* Cabecera editorial: etiqueta, título serif grande y bajada */
  function cabeceraPanel(d) {
    return (
      '<header class="panel-cabecera" data-reveal>' +
        '<p class="panel-tema">Tema ' + esc(d.numero) + '</p>' +
        '<h2 class="panel-titulo">' + esc(d.titulo) + '</h2>' +
        '<p class="panel-bajada">' + esc(d.bajada) + '</p>' +
      '</header>'
    );
  }

  function seccionIntroduccion(d) {
    return (
      '<section class="seccion seccion--intro" data-reveal id="' + d.id + '-introduccion">' +
        '<span class="puntos" aria-hidden="true"></span>' +
        '<p class="seccion-numero">Paso ' + pad2(1) + '</p>' +
        '<h3 class="seccion-titulo">Introducción</h3>' +
        '<p class="seccion-texto">' + esc(d.introduccion) + '</p>' +
      '</section>'
    );
  }

  function seccionTeoria(d) {
    return (
      '<section class="seccion" data-reveal id="' + d.id + '-teoria">' +
        '<p class="seccion-numero">Paso ' + pad2(2) + '</p>' +
        '<h3 class="seccion-titulo">Contenido teórico</h3>' +
        d.teoria.map(function (bloque) {
          return (
            '<article class="bloque">' +
              '<h4 class="bloque-subtitulo">' + esc(bloque.subtitulo) + '</h4>' +
              '<p>' + esc(bloque.texto) + '</p>' +
              (bloque.formula ? formulas(bloque.formula) : '') +
            '</article>'
          );
        }).join('') +
      '</section>'
    );
  }

  /* La fórmula puede ser un texto único o una lista. Se inserta tal cual:
     admite <sub> y <sup> para subíndices y superíndices. */
  function formulas(formula) {
    const lista = Array.isArray(formula) ? formula : [formula];
    return lista.map(function (f) {
      return '<p class="formula">' + f + '</p>';
    }).join('');
  }

  function seccionVideo(d) {
    let contenido;

    if (esMarcador(d.idVideoYouTube)) {
      /* Sin ID de video: se muestra el marcador con instrucciones */
      contenido =
        '<div class="video video--pendiente">' +
          '<p class="video-pendiente-titulo">Video por completar</p>' +
          '<p class="video-pendiente-texto">' + esc(d.idVideoYouTube) + '</p>' +
          '<p class="video-pendiente-ayuda">Agregue el ID en <code>js/datos.js</code> ' +
          '(campo <code>idVideoYouTube</code>). Vea el README.</p>' +
        '</div>';
    } else {
      /* La miniatura se genera automáticamente a partir del ID */
      const id = String(d.idVideoYouTube).trim();
      const url = 'https://www.youtube.com/watch?v=' + encodeURIComponent(id);
      const miniatura = 'https://i.ytimg.com/vi/' + encodeURIComponent(id) + '/hqdefault.jpg';

      contenido =
        '<a class="video" href="' + url + '" target="_blank" rel="noopener noreferrer" ' +
             'aria-label="Ver el video en YouTube (se abre en pestaña nueva)">' +
          '<img class="video-miniatura" src="' + miniatura + '" alt="" ' +
               'loading="lazy" referrerpolicy="no-referrer">' +
          '<span class="video-play" aria-hidden="true">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>' +
          '</span>' +
        '</a>';
    }

    /* Ficha técnica del video educativo */
    contenido += fichaVideo(d.fichaVideo);

    /* Nota de producción (opcional): resumen de una línea + botón que abre
       el documento aparte con el prompt completo y ordenado. */
    if (d.notaVideo) {
      const paginaPrompt = d.paginaPromptVideo || 'prompt-video.html';
      contenido +=
        '<div class="presentacion-nota">' +
          '<p><strong>Cómo se hizo este video.</strong> ' + esc(d.notaVideo) + '</p>' +
          '<a class="nota-prompt-boton" href="' + esc(paginaPrompt) + '" target="_blank" ' +
             'rel="noopener noreferrer">' +
            'Ver el prompt completo del video' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3zM5 5h6v2H7v10h10v-4h2v6H5V5z"/></svg>' +
          '</a>' +
        '</div>';
    }

    return (
      '<section class="seccion" data-reveal id="' + d.id + '-video">' +
        '<p class="seccion-numero">Paso ' + pad2(4) + '</p>' +
        '<h3 class="seccion-titulo">Video educativo</h3>' +
        contenido +
      '</section>'
    );
  }

  /* Ficha técnica en filas clave → valor; los campos sin completar quedan
     atenuados (los marcadores [COMPLETAR] se ven tal cual). */
  function fichaVideo(ficha) {
    ficha = ficha || {};

    function fila(clave, valor) {
      const pendiente = valor == null || esMarcador(String(valor));
      return (
        '<div class="ficha-fila">' +
          '<span class="ficha-clave">' + clave + '</span>' +
          '<span class="ficha-valor' + (pendiente ? ' ficha-valor--pendiente' : '') + '">' +
            esc(valor == null ? '' : valor) +
          '</span>' +
        '</div>'
      );
    }

    return (
      '<div class="ficha-video">' +
        fila('Título', ficha.titulo) +
        fila('Canal', ficha.canal) +
        fila('Plataforma', ficha.plataforma) +
        fila('Duración', ficha.duracion) +
      '</div>'
    );
  }

  function seccionLectura(d) {
    const material = d.materialLectura || {};
    let contenido;

    if (esMarcador(material.enlace)) {
      /* Sin enlace: botón en estado pendiente con instrucciones */
      contenido =
        '<button class="boton-primario boton-presentacion boton-presentacion--pendiente" ' +
                'type="button" aria-disabled="true">' +
          'Abrir material de lectura' +
        '</button>' +
        '<p class="presentacion-nota">' + esc(material.enlace) +
          ' — agréguelo en <code>js/datos.js</code> (campo <code>materialLectura.enlace</code>).</p>';
    } else {
      contenido =
        '<a class="boton-primario boton-presentacion" href="' + esc(material.enlace) +
           '" target="_blank" rel="noopener noreferrer">' +
          'Abrir material de lectura' +
          SVG_EXTERNO +
        '</a>' +
        '<p class="presentacion-nota">Se abre en una pestaña nueva.</p>';
    }

    return (
      '<section class="seccion" data-reveal id="' + d.id + '-lectura">' +
        '<p class="seccion-numero">Paso ' + pad2(3) + '</p>' +
        '<h3 class="seccion-titulo">Material de lectura</h3>' +
        '<p class="seccion-texto">' + esc(material.descripcion || '') + '</p>' +
        contenido +
      '</section>'
    );
  }

  /* Banco de imágenes: galería acordeón (AccordionGallery, isla React en
     js/accordion-gallery-react.js) con las entradas que tienen «archivo»,
     y una leyenda por imagen (número, título, descripción y crédito).
     Si ninguna entrada tiene archivo todavía, se conserva la rejilla de
     marcos pendientes de siempre. */
  function seccionImagenes(d) {
    const banco = d.bancoImagenes || [];
    const conArchivo = banco.filter(function (imagen) { return imagen.archivo; });

    let cuerpo = '';
    if (conArchivo.length >= 2) {
      cuerpo +=
        '<div class="banco-acordeon" data-banco-acordeon data-tema="' + d.id + '" ' +
              'aria-label="Galería acordeón de imágenes del tema"></div>';
    } else {
      cuerpo +=
        '<div class="banco-rejilla">' +
          banco.map(function (imagen, i) {
            const marco = imagen.archivo
              ? '<img class="imagen-archivo" src="' + esc(imagen.archivo) + '" ' +
                     'alt="' + esc(imagen.descripcion) + '" loading="lazy">'
              : esc(imagen.descripcion);
            return (
              '<div class="imagen-tarjeta">' +
                '<p class="imagen-numero">Imagen ' + pad2(i + 1) + '</p>' +
                '<div class="imagen-marco">' + marco + '</div>' +
                '<p class="imagen-credito">Crédito: ' + esc(imagen.credito) + '</p>' +
              '</div>'
            );
          }).join('') +
        '</div>';
    }

    const leyendas =
      '<ol class="banco-leyendas">' +
        banco.map(function (imagen, i) {
          return (
            '<li class="leyenda">' +
              '<p class="leyenda-numero">Imagen ' + pad2(i + 1) + '</p>' +
              (imagen.titulo ? '<p class="leyenda-titulo">' + esc(imagen.titulo) + '</p>' : '') +
              '<p class="leyenda-descripcion">' + esc(imagen.descripcion) + '</p>' +
              '<p class="leyenda-credito">Crédito: ' + esc(imagen.credito) + '</p>' +
            '</li>'
          );
        }).join('') +
      '</ol>';

    return (
      '<section class="seccion" id="' + d.id + '-imagenes">' +
        '<p class="seccion-numero">Paso ' + pad2(5) + '</p>' +
        '<h3 class="seccion-titulo">Banco de imágenes</h3>' +
        cuerpo + leyendas +
      '</section>'
    );
  }

  function seccionMas(d) {
    const rc = d.recursosComplementarios || {};

    return (
      '<section class="seccion" data-reveal id="' + d.id + '-mas">' +
        '<p class="seccion-numero">Paso ' + pad2(7) + '</p>' +
        '<h3 class="seccion-titulo">Más información</h3>' +
        '<p class="seccion-texto">' + esc(d.masInformacion) + '</p>' +
        '<div class="recursos-apa">' +
          '<h4 class="recursos-apa-titulo">Recursos complementarios</h4>' +
          (rc.nota ? '<p class="recursos-apa-nota">' + esc(rc.nota) + '</p>' : '') +
          '<ul class="recursos-apa-lista">' +
            (rc.referencias || []).map(function (referencia) {
              /* Cada recurso: botón de vidrio que abre el sitio (ver o
                 descargar el documento) y, debajo, la cita APA como
                 descripción. El botón lleva boton-presentacion, así que
                 prepararPanel lo vitra con el color del tema. */
              const url = (String(referencia).match(/https?:\/\/\S+/) || [])[0];
              if (!url) {
                return '<li class="recursos-apa-item">' + esc(referencia) + '</li>';
              }
              return (
                '<li class="recursos-apa-item">' +
                  '<a class="boton-primario boton-presentacion recursos-apa-boton" href="' + esc(url) +
                     '" target="_blank" rel="noopener noreferrer">' +
                    'Ver o descargar el recurso' + SVG_EXTERNO +
                  '</a>' +
                  '<p class="recursos-apa-referencia">' + esc(referencia) + '</p>' +
                '</li>'
              );
            }).join('') +
          '</ul>' +
        '</div>' +
      '</section>'
    );
  }

  /* Autoevaluación: descripción breve del cuestionario y botón hacia Google
     Forms. Las preguntas no se listan en la página: se descubren al abrir
     el cuestionario. */
  function seccionAutoevaluacion(d) {
    const auto = d.autoevaluacion || {};
    let boton;

    if (esMarcador(auto.enlaceForms)) {
      boton =
        '<button class="boton-primario boton-presentacion boton-presentacion--pendiente autoevaluacion-forms" ' +
                'type="button" aria-disabled="true">' +
          'Resolver en Google Forms' +
        '</button>' +
        '<p class="presentacion-nota">' + esc(auto.enlaceForms) +
          ' — agréguelo en <code>js/datos.js</code> (campo <code>autoevaluacion.enlaceForms</code>).</p>';
    } else {
      boton =
        '<a class="boton-primario boton-presentacion autoevaluacion-forms" href="' + esc(auto.enlaceForms) +
           '" target="_blank" rel="noopener noreferrer">' +
          'Resolver en Google Forms' +
          SVG_EXTERNO +
        '</a>' +
        '<p class="presentacion-nota">Se abre en una pestaña nueva.</p>';
    }

    return (
      '<section class="seccion" data-reveal id="' + d.id + '-autoevaluacion">' +
        '<p class="seccion-numero">Paso ' + pad2(8) + '</p>' +
        '<h3 class="seccion-titulo">Autoevaluación</h3>' +
        '<div class="autoevaluacion">' +
          '<p class="autoevaluacion-instrucciones">' + esc(auto.descripcion || '') + '</p>' +
          boton +
        '</div>' +
      '</section>'
    );
  }

  function seccionJuegos(d) {
    return (
      '<section class="seccion" data-reveal id="' + d.id + '-juegos">' +
        '<p class="seccion-numero">Paso ' + pad2(6) + '</p>' +
        '<h3 class="seccion-titulo">Actividades interactivas</h3>' +
        '<div class="juegos-rejilla">' +
          d.juegos.map(function (juego, i) {
            return (
              '<a class="juego-tarjeta" href="' + esc(juego.archivo) + '" data-reveal>' +
                '<span class="juego-tarjeta-numero">Juego ' + pad2(i + 1) + '</span>' +
                '<span class="juego-tarjeta-nombre">' + esc(juego.nombre) + '</span>' +
                '<span class="juego-tarjeta-descripcion">' + esc(juego.descripcion) + '</span>' +
                '<span class="juego-tarjeta-accion">Jugar →</span>' +
              '</a>'
            );
          }).join('') +
        '</div>' +
      '</section>'
    );
  }

  function seccionCierre(d) {
    const meta = DATOS.meta;
    return (
      '<section class="seccion" data-reveal id="' + d.id + '-cierre">' +
        '<p class="seccion-numero">Paso ' + pad2(9) + '</p>' +
        '<h3 class="seccion-titulo">Cierre</h3>' +
        '<div class="cierre">' +
          '<div class="cierre-deco" aria-hidden="true">' +
            '<span class="puntos"></span>' +
            '<span class="blob"></span>' +
          '</div>' +
          '<p class="cierre-gracias">' + esc(d.cierre.titulo) + '</p>' +
          '<p class="cierre-texto">' + esc(d.cierre.texto) + '</p>' +
          '<ul class="cierre-integrantes">' +
            meta.integrantes.map(function (nombre) {
              return '<li>' + esc(nombre) + '</li>';
            }).join('') +
          '</ul>' +
          '<p class="cierre-meta">' + esc(meta.curso) + ' · ' + esc(meta.turno) + '</p>' +
          '<p class="cierre-fecha">' + esc(meta.fecha) + '</p>' +
        '</div>' +
      '</section>'
    );
  }

  /* Comportamiento interno de cada panel ya construido */
  function prepararPanel(panel, datosTema) {
    /* Los botones de la barra pasan a vidrio; vidriar() devuelve el botón
       real que quedó dentro del vidrio, así que los oyentes de abajo se
       cuelgan sobre el nodo correcto. El interruptor no necesita retorno:
       js/modo.js lo escucha por delegación. */
    const botonVolver = vidriar($('.panel-volver', panel), VIDRIO_ICONO);
    const botonGuardar = vidriar($('.boton-guardar', panel), VIDRIO_ICONO);
    const botonMenu = vidriar($('.boton-menu', panel), VIDRIO_ICONO);
    vidriar($('.interruptor-modo', panel), VIDRIO_ICONO);

    /* Tarjetas de actividades (paso 6): el "Jugar →" de cada tarjeta pasa a
       chip de vidrio. El enlace es la tarjeta completa y no lleva oyentes,
       así que no hace falta el nodo que devuelve vidriar(). */
    $$('.juego-tarjeta-accion', panel).forEach(function (accion) {
      vidriar(accion, VIDRIO_JUGAR);
    });
    const menu = $('.panel-menu', panel);

    /* Flecha de volver: cierra el panel y regresa a la portada */
    botonVolver.addEventListener('click', cerrarPanel);

    /* Menú del índice: desplegar / plegar */
    botonMenu.addEventListener('click', function () {
      const abrir = menu.hidden;
      menu.hidden = !abrir;
      botonMenu.setAttribute('aria-expanded', String(abrir));
      botonMenu.setAttribute('aria-label',
        abrir ? 'Cerrar el índice de secciones' : 'Abrir el índice de secciones');
      if (abrir) {
        const primero = $('.indice-enlace', menu);
        if (primero) primero.focus();
      }
    });

    /* Enlaces del índice: desplazamiento suave SIN tocar la URL
       (la URL solo cambia para #cinematica / #estequiometria).
       Si el enlace estaba dentro del menú, el menú se pliega. */
    panel.addEventListener('click', function (evento) {
      const enlace = evento.target.closest('.indice-enlace');
      if (!enlace) return;
      evento.preventDefault();
      const destino = $(enlace.getAttribute('href'));
      if (destino) {
        destino.scrollIntoView({
          behavior: reducirMovimiento() ? 'auto' : 'smooth',
          block: 'start',
        });
      }
      if (!menu.hidden) {
        menu.hidden = true;
        botonMenu.setAttribute('aria-expanded', 'false');
        botonMenu.setAttribute('aria-label', 'Abrir el índice de secciones');
      }
    });

    /* Guardar posición: memoriza la sección que se está leyendo */
    botonGuardar.addEventListener('click', function () {
      const activo = $('.indice-enlace.activo', panel);
      const destino = activo
        ? activo.getAttribute('href')
        : '#' + datosTema.id + '-introduccion';
      const nombre = activo
        ? activo.textContent.replace(/^\s*\d+\s*/, '').trim()
        : SECCIONES[0][1];

      guardarPosicion({ tema: datosTema.id, seccion: destino });
      mostrarToast('Posición guardada · ' + nombre);
    });

    /* Si la miniatura no carga (sin conexión), avisar sin romper el enlace */
    const miniatura = $('.video-miniatura', panel);
    if (miniatura) {
      let yaManejado = false;
      function manejarFallo() {
        if (yaManejado) return;
        yaManejado = true;
        miniatura.style.display = 'none';
        miniatura.closest('.video').insertAdjacentHTML('afterbegin',
          '<p class="video-fallo">Miniatura no disponible sin conexión.<br>' +
          'El botón abrirá YouTube normalmente.</p>');
      }

      miniatura.addEventListener('error', manejarFallo);

      /* Por si la imagen ya terminó de fallir antes de registrar el listener */
      if (miniatura.complete && miniatura.naturalWidth === 0) manejarFallo();
    }

    /* Contenido del panel en vidrio: CTA de lectura y de autoevaluación
       (con el color del tema), botón del prompt completo y botón de play
       del video. Los estados pendientes (borde punteado) quedan como son. */
    $$('.boton-presentacion:not(.boton-presentacion--pendiente)', panel).forEach(function (boton) {
      vidriar(boton, vidrioDeTema(88, 14, 'vidrio-primario'));
    });
    $$('.nota-prompt-boton', panel).forEach(function (boton) {
      vidriar(boton, {
        clase: 'vidrio-prompt',
        radio: 999,
        opacidadFondo: 0.12,
        refraccion: false,
      });
    });
    $$('.video-play', panel).forEach(function (boton) {
      vidriar(boton, vidrioDeTema(72, 50, 'vidrio-play'));
    });

    seguirIndice(panel);
  }

  /* Resalta en el índice la sección que se está leyendo y actualiza el
     indicador de paso ("Paso X de 7 · Nombre") y la línea de progreso. */
  function seguirIndice(panel) {
    const enlaces = $$('.indice-enlace', panel);
    if (!enlaces.length) return;
    const secciones = enlaces.map(function (enlace) {
      return $(enlace.getAttribute('href'));
    });

    const pasoTexto = $('.panel-paso-texto', panel);
    const pasoNombre = $('.panel-paso-nombre', panel);
    const progreso = $('.panel-progreso', panel);

    function actualizar() {
      let activo = 0;
      secciones.forEach(function (seccion, i) {
        if (seccion && seccion.getBoundingClientRect().top <= 160) activo = i;
      });
      enlaces.forEach(function (enlace, i) {
        enlace.classList.toggle('activo', i === activo);
      });

      if (pasoTexto) pasoTexto.textContent = 'Paso ' + (activo + 1) + ' de ' + SECCIONES.length;
      if (pasoNombre) pasoNombre.textContent = ' · ' + SECCIONES[activo][1];
      if (progreso) progreso.style.width = ((activo + 1) / SECCIONES.length * 100) + '%';
    }

    let pendiente = false;
    function alDesplazar() {
      if (pendiente) return;
      pendiente = true;
      window.requestAnimationFrame(function () {
        pendiente = false;
        actualizar();
      });
    }

    panel.addEventListener('scroll', alDesplazar, { passive: true });
    window.addEventListener('scroll', alDesplazar, { passive: true });

    /* Queda expuesta para recalcular en el momento en que el panel se
       abre (mientras está oculto, las medidas del DOM dan 0 y el cálculo
       inicial no sirve). */
    panel.__indiceActualizar = actualizar;

    actualizar();
  }


  /* =============== 2b. Acerca de este proyecto (portada) ================= */
  /* Card flotante "Sobre este proyecto" sobre la línea central + diálogo
     "Conocer más". El objetivo del proyecto aparece explícitamente en la
     card y, completo, como primer párrafo del diálogo.                   */

  function construirAcercade() {
    const acerca = DATOS.acercaDe;
    const meta = DATOS.meta;
    const lienzo = $('.portada-lienzo');
    if (!lienzo || !acerca) return;

    /* --- Card flotante (la card entera es el botón).
           Píldora negra centrada sobre la línea central, colgada de la
           intersección con el borde del masthead (el top exacto lo fija
           css/acerca.css): badge de ícono con su borde superior en ese
           cruce, textos a la izquierda, separador vertical y «Conocer
           más →» a la derecha (solo PC; en celular queda el cuadrado
           compacto de la esquina). --- */
    const tarjeta = document.createElement('aside');
    tarjeta.className = 'acercade';
    tarjeta.innerHTML =
      '<button class="acercade-tarjeta" type="button" id="acercade-boton" ' +
              'aria-haspopup="dialog" aria-controls="dialogo-acercade">' +
        '<span class="acercade-icn" aria-hidden="true">' +
          '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h6"/></svg>' +
        '</span>' +
        '<span class="acercade-textos">' +
          '<span class="acercade-etiqueta">' + esc(acerca.etiqueta) + '</span>' +
          '<span class="acercade-titulo">' + esc(acerca.titulo) + '</span>' +
        '</span>' +
        '<span class="acercade-separador" aria-hidden="true"></span>' +
        '<span class="acercade-enlace">Conocer más ' + SVG_FLECHA + '</span>' +
      '</button>';
    lienzo.appendChild(tarjeta);

    /* La píldora entera pasa a ser un vidrio GlassSurface con refracción
       (refracta la onda del fondo; el badge puede seguir sobresaliendo).
       Sin React, vidriar() no cambia nada. */
    vidriar($('#acercade-boton'), VIDRIO_PILDORA);

    /* --- Diálogo "Conocer más" --- */
    /* Ancho de documento (54rem en PC), con el contenido en la misma columna
       de lectura que los paneles. Los párrafos pueden ser texto suelto o
       bloques con subtítulo ({ subtitulo, texto }); los bloques con
       subtítulo llevan su número (01, 02…), como los pasos de los paneles
       (en celular los números se ocultan por CSS: el estilo es solo PC). */
    var numeroBloque = 0;
    const dialogo = document.createElement('div');
    dialogo.className = 'dialogo-acercade';
    dialogo.id = 'dialogo-acercade';
    dialogo.hidden = true;
    dialogo.setAttribute('role', 'dialog');
    dialogo.setAttribute('aria-modal', 'true');
    dialogo.setAttribute('aria-labelledby', 'dialogo-acercade-titulo');
    dialogo.innerHTML =
      '<div class="dialogo-acercade-tarjeta">' +
        '<button class="dialogo-cerrar" type="button" aria-label="Cerrar el diálogo">' +
          SVG_CERRAR +
        '</button>' +
        '<div class="dialogo-cuerpo">' +
          '<p class="dialogo-etiqueta">' + esc(acerca.etiqueta) + '</p>' +
          '<h2 class="dialogo-titulo" id="dialogo-acercade-titulo">' + esc(acerca.titulo) + '</h2>' +
          '<p class="dialogo-parrafo"><strong>Objetivo.</strong> ' + esc(meta.objetivo) + '</p>' +
          (acerca.parrafos || []).map(function (parrafo) {
            if (typeof parrafo === 'string') {
              return '<p class="dialogo-parrafo">' + esc(parrafo) + '</p>';
            }
            numeroBloque += 1;
            return (
              '<p class="dialogo-numero" aria-hidden="true">' +
                ('0' + numeroBloque).slice(-2) +
              '</p>' +
              '<h3 class="dialogo-subtitulo">' + esc(parrafo.subtitulo) + '</h3>' +
              '<p class="dialogo-parrafo">' + esc(parrafo.texto) + '</p>'
            );
          }).join('') +
          '<div class="dialogo-equipo">' +
            '<p class="dialogo-integrantes">' + esc(meta.integrantes.join(' e ')) + '</p>' +
            '<p class="dialogo-meta">' + esc(meta.curso) + ' · ' + esc(meta.turno) + '</p>' +
            (meta.carrera ? '<p class="dialogo-meta">' + esc(meta.carrera) + '</p>' : '') +
          '</div>' +
          '<a class="dialogo-gracias" href="https://youtu.be/dQw4w9WgXcQ?si=hRmQkVe576Fv4eBI" ' +
             'target="_blank" rel="noopener noreferrer">' +
            'Gracias por apoyarnos' +
          '</a>' +
        '</div>' +
      '</div>';
    document.body.appendChild(dialogo);

    /* La tarjeta del diálogo y su botón de cierre también van en vidrio
       (esmerilado, con alta opacidad para que la lectura siga cómoda) */
    vidriar($('.dialogo-acercade-tarjeta', dialogo), VIDRIO_DIALOGO);
    vidriar($('.dialogo-cerrar', dialogo), VIDRIO_ICONO);

    const botonAbrir = $('#acercade-boton');
    const botonCerrar = $('.dialogo-cerrar', dialogo);
    let ultimoFoco = null;

    function abrirDialogo() {
      ultimoFoco = botonAbrir;
      dialogo.hidden = false;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      botonCerrar.focus();
    }

    function cerrar() {
      if (dialogo.hidden) return;
      dialogo.hidden = true;
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
    }

    dialogoAcercade = dialogo;
    cerrarDialogoAcercade = cerrar;

    botonAbrir.addEventListener('click', abrirDialogo);
    botonCerrar.addEventListener('click', cerrar);

    /* Clic en el fondo (fuera de la tarjeta) también cierra */
    dialogo.addEventListener('click', function (evento) {
      if (evento.target === dialogo) cerrar();
    });

    /* Encierre del foco (Tab) dentro del diálogo mientras esté abierto */
    dialogo.addEventListener('keydown', function (evento) {
      if (evento.key !== 'Tab' || dialogo.hidden) return;
      const enfocables = $$('button, [href], input, select, textarea', dialogo)
        .filter(function (el) { return el.offsetParent !== null; });
      if (!enfocables.length) return;
      const primero = enfocables[0];
      const ultimo = enfocables[enfocables.length - 1];
      if (evento.shiftKey && document.activeElement === primero) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primero.focus();
      }
    });
  }


  /* ================= 3. Posición guardada (localStorage) ================== */

  function guardarPosicion(valor) {
    try {
      window.localStorage.setItem(CLAVE_POSICION, JSON.stringify(valor));
    } catch (e) {
      /* Sin almacenamiento disponible: la función solo no recuerda */
    }
  }

  function leerPosicion() {
    try {
      const bruto = window.localStorage.getItem(CLAVE_POSICION);
      const valor = bruto ? JSON.parse(bruto) : null;
      return valor && valor.tema && valor.seccion ? valor : null;
    } catch (e) {
      return null;
    }
  }

  /* Toast: aviso breve en la parte inferior de la pantalla */
  let toastElemento = null;
  let toastTimer = null;

  function mostrarToast(texto) {
    if (!toastElemento) {
      toastElemento = document.createElement('p');
      toastElemento.className = 'toast';
      toastElemento.setAttribute('role', 'status');
      document.body.appendChild(toastElemento);
    }
    toastElemento.textContent = texto;
    /* Reinicia la transición si ya estaba visible */
    void toastElemento.offsetWidth;
    toastElemento.classList.add('visible');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastElemento.classList.remove('visible');
    }, 2400);
  }


  /* ==================== 4. Apertura y cierre de paneles =================== */
  /*                                                                         */
  /* Toda la pantalla se sincroniza SIEMPRE con location.hash:               */
  /*     #cinematica / #estequiometria        →  panel abierto               */
  /*     #cinematica-juegos (y similares)     →  panel abierto en la sección */
  /*     sin hash                             →  portada                     */
  /* Así el botón "atrás" del navegador cierra el panel de forma natural.    */

  function sincronizar(opciones) {
    opciones = opciones || {};
    const enfocar = opciones.enfocar === true;
    const hash = (window.location.hash || '').replace('#', '');

    /* El hash puede ser el tema puro o una sección profunda (-juegos) */
    let tema = null;
    let seccionDestino = null;
    TEMAS.forEach(function (t) {
      if (hash === t) {
        tema = t;
      } else if (hash === t + '-juegos') {
        tema = t;
        seccionDestino = t + '-juegos';
      }
    });

    const recienAbiertos = [];

    TEMAS.forEach(function (t) {
      const mitad = $('#mitad-' + t);
      const panel = $('#panel-' + t);
      const estabaAbierto = !panel.hidden;
      const abierta = tema === t;

      mitad.classList.toggle('mitad--activa', abierta);
      mitad.classList.toggle('mitad--segunda', tema !== null && !abierta);
      mitad.setAttribute('aria-expanded', String(abierta));

      /* La mitad activa queda cubierta por su panel: fuera del tab y oculta
         para lectores de pantalla (su contenido ya está en el panel). */
      mitad.tabIndex = abierta ? -1 : 0;
      mitad.setAttribute('aria-hidden', abierta ? 'true' : 'false');

      panel.hidden = !abierta;
      panel.classList.toggle('panel--abierto', abierta);

      if (abierta && !estabaAbierto) recienAbiertos.push(t);
    });

    temaAbierto = tema;

    /* Con un panel abierto, la card "Sobre este proyecto" se aparta
       (en celular el panel corre por debajo y la card fija estorbaría). */
    const portada = $('#portada');
    if (portada) portada.classList.toggle('portada--con-panel', tema !== null);

    /* Recalcula el indicador de paso y la línea de progreso ahora que el
       panel es visible (las medidas con el panel oculto eran incorrectas) */
    TEMAS.forEach(function (t) {
      const panel = $('#panel-' + t);
      if (!panel.hidden && typeof panel.__indiceActualizar === 'function') {
        panel.__indiceActualizar();
      }
    });

    /* Foco al abrir: entra al panel (útil con teclado y lectores de pantalla) */
    if (tema && enfocar) {
      const panel = $('#panel-' + tema);
      panel.setAttribute('tabindex', '-1');
      panel.focus({ preventScroll: true });
      panel.scrollIntoView({
        behavior: reducirMovimiento() ? 'auto' : 'smooth',
        block: 'start',
      });
    }

    /* Foco al cerrar: vuelve a la mitad que se había elegido */
    if (!tema && mitadAEnfocar) {
      const mitad = $('#mitad-' + mitadAEnfocar);
      mitadAEnfocar = null;
      mitad.focus();
    }

    /* Paneles recién abiertos: salto a la sección pedida en la URL o,
       si no, continuación desde la posición guardada. */
    recienAbiertos.forEach(function (t) {
      let destino = null;
      let esContinuacion = false;

      if (seccionDestino && seccionDestino.indexOf(t) === 0) {
        destino = document.getElementById(seccionDestino);
      } else {
        const guardado = leerPosicion();
        if (guardado && guardado.tema === t) {
          destino = document.querySelector(guardado.seccion);
          esContinuacion = true;
        }
      }

      if (!destino) return;

      window.setTimeout(function () {
        if (panelCerrado(t)) return;
        destino.scrollIntoView({
          behavior: reducirMovimiento() ? 'auto' : 'smooth',
          block: 'start',
        });
        if (esContinuacion) mostrarToast('Continuando donde lo dejaste');
      }, 450);
    });

    function panelCerrado(t) {
      const panel = $('#panel-' + t);
      return !panel || panel.hidden;
    }
  }

  function activarPanel(tema) {
    if (tema === temaAbierto) return;

    if (temaAbierto) {
      /* Cambio directo de tema: se reemplaza la entrada del historial para
         que "atrás" cierre el panel en vez de volver al tema anterior. */
      if (empujoHash) {
        window.location.replace('#' + tema);
      } else {
        window.location.hash = tema;
        empujoHash = true;
      }
    } else {
      /* Apertura normal: se agrega una entrada al historial, de modo que
         el botón "atrás" del navegador cierra el panel. */
      empujoHash = true;
      window.location.hash = tema;
    }

    /* El hash ya cambió de forma síncrona; el evento hashchange posterior
       solo vuelve a sincronizar (la función es indempotente). */
    sincronizar({ enfocar: true });
  }

  function cerrarPanel() {
    if (!temaAbierto) return;
    mitadAEnfocar = temaAbierto;

    if (empujoHash) {
      /* Volver a la entrada anterior del historial (sin hash → portada) */
      empujoHash = false;
      window.history.back();
      /* Respaldo por si el navegador no disparara hashchange */
      window.setTimeout(function () {
        if (temaAbierto && !window.location.hash) sincronizar();
      }, 350);
    } else if (window.location.hash) {
      /* P. ej. se entró directamente con #tema: limpiar el hash */
      window.location.hash = '';
      sincronizar();
    } else {
      sincronizar();
    }
  }


  /* ============================== 5. Eventos ============================== */

  function conectarEventos() {
    TEMAS.forEach(function (tema) {
      const mitad = $('#mitad-' + tema);

      mitad.addEventListener('click', function () {
        activarPanel(tema);
      });

      /* role="button": Enter y Espacio activan igual que un clic */
      mitad.addEventListener('keydown', function (evento) {
        if (evento.key === 'Enter' || evento.key === ' ' || evento.key === 'Spacebar') {
          evento.preventDefault();
          activarPanel(tema);
        }
      });
    });

    /* Esc cierra primero el menú del índice abierto y después el panel */
    document.addEventListener('keydown', function (evento) {
      if (evento.key !== 'Escape') return;

      /* Prioridad 1: el diálogo "Acerca de este proyecto" */
      if (dialogoAcercade && !dialogoAcercade.hidden) {
        if (cerrarDialogoAcercade) cerrarDialogoAcercade();
        return;
      }

      const menuAbierto = $('.panel-menu:not([hidden])');
      if (menuAbierto) {
        menuAbierto.hidden = true;
        const barra = menuAbierto.closest('.panel-barra');
        const botonMenu = barra ? $('.boton-menu', barra) : null;
        if (botonMenu) {
          botonMenu.setAttribute('aria-expanded', 'false');
          botonMenu.setAttribute('aria-label', 'Abrir el índice de secciones');
          botonMenu.focus();
        }
        return;
      }

      cerrarPanel();
    });

    /* Botones atrás/adelante del navegador y cambios de hash en general */
    window.addEventListener('hashchange', function () {
      sincronizar();
    });
  }


  /* ============================== arranque ================================ */

  document.addEventListener('DOMContentLoaded', function () {
    if (!DATOS) {
      document.body.innerHTML =
        '<p style="padding:2rem">No se pudo cargar <code>js/datos.js</code>.</p>';
      return;
    }

    pintarPortada();
    construirPaneles();
    construirAcercade();
    conectarEventos();

    /* Portada en vidrio: el interruptor de modo (su clic lo atrapa js/modo.js
       por delegación, no hace falta recolgarlo) y los dos botones
       "Elegir tema", cada uno con el color de su tema translúcido */
    vidriar($('.portada-cabecera .interruptor-modo'), VIDRIO_ICONO);
    $$('.mitad .mitad-boton').forEach(function (boton) {
      vidriar(boton, vidrioDeTema(88, 14, 'vidrio-mitad'));
    });

    /* Refresca los interruptores de modo de los paneles recién construidos
       (js/modo.js se carga antes que este archivo) */
    if (window.ModoOscuro && window.ModoOscuro.actualizarInterruptores) {
      window.ModoOscuro.actualizarInterruptores();
    }

    /* Abre el panel si la URL ya trae #cinematica o #estequiometria */
    sincronizar();
  });

}());

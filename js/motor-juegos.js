/* ============================================================================
   motor-juegos.js — Motores de juegos reutilizables (sin librerías)
   ----------------------------------------------------------------------------
   Cada página de la carpeta juegos/ carga este archivo y después su propio
   archivo de datos, que hace la llamada:

       MotorJuegos.iniciar({ tipo: 'quiz', preguntas: [ ... ] });

   Tipos disponibles y campos que espera cada uno:
     'quiz'            → opción múltiple      (campo: preguntas)
     'verdadero-falso' → afirmaciones V / F   (campo: afirmaciones)
     'ordenar'         → ordenar pasos        (campo: pasos)
     'memoria'         → encontrar pares     (campo: parejas)
     'completar'       → completar espacios  (campo: frases)
     'clasificar'      → clasificar items     (campo: categorias, items)
     'adivina'         → adivinar la palabra (campo: palabras)
     'emparejar'       → unir dos columnas   (campo: parejas)

   Todos los motores comparten la misma interfaz: marcador arriba, área de
   juego, retroalimentación con explicación y botón "Reiniciar".
   ========================================================================== */

window.MotorJuegos = (function () {
  'use strict';

  /* --------------------------- utilidades --------------------------- */

  function $(selector, contexto) {
    return (contexto || document).querySelector(selector);
  }

  function $$(selector, contexto) {
    return Array.prototype.slice.call((contexto || document).querySelectorAll(selector));
  }

  function esc(texto) {
    return String(texto).replace(/[&<>"']/g, function (caracter) {
      return {
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
      }[caracter];
    });
  }

  /* Mezcla de Fisher-Yates (devuelve una copia mezclada) */
  function barajar(lista) {
    const copia = lista.slice();
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temporal = copia[i];
      copia[i] = copia[j];
      copia[j] = temporal;
    }
    return copia;
  }

  function reducirMovimiento() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function actualizarMarcador(texto) {
    const elemento = $('#mj-marcador');
    if (elemento) elemento.textContent = texto;
  }

  /* Pantalla final compartida por los motores con puntaje */
  function pintarResultado(area, aciertos, total) {
    let mensaje;
    if (aciertos === total) mensaje = '¡Excelente! Dominas el tema por completo.';
    else if (aciertos >= Math.ceil(total * 0.6)) mensaje = '¡Muy bien! Solo falta afinar algún detalle.';
    else mensaje = 'Buen intento: conviene repasar la teoría y volver a jugar.';

    area.innerHTML =
      '<div class="juego-resultado">' +
        '<p class="juego-resultado-puntaje">' + aciertos + ' / ' + total + '</p>' +
        '<p>' + esc(mensaje) + '</p>' +
        '<button type="button" class="juego-boton" id="mj-otra">Jugar de nuevo</button>' +
      '</div>';

    /* El botón reutiliza el "Reiniciar" de la barra superior */
    $('#mj-otra').addEventListener('click', function () {
      $('#mj-reiniciar').click();
    });
  }

  /* -------------------------- punto de entrada -------------------------- */

  function iniciar(config) {
    const zona = $('#juego-zona');
    if (!zona) return;

    /* Barra compartida: marcador + reiniciar */
    zona.innerHTML =
      '<div class="juego-estado">' +
        '<span class="juego-marcador" id="mj-marcador"></span>' +
        '<button class="juego-reiniciar" type="button" id="mj-reiniciar">Reiniciar</button>' +
      '</div>' +
      '<div class="juego-area" id="mj-area"></div>';

    $('#mj-reiniciar').addEventListener('click', montar);

    function montar() {
      const area = $('#mj-area');
      try {
        if (config.tipo === 'quiz') quiz(area, config);
        else if (config.tipo === 'verdadero-falso') verdaderoFalso(area, config);
        else if (config.tipo === 'ordenar') ordenar(area, config);
        else if (config.tipo === 'memoria') memoria(area, config);
        else if (config.tipo === 'completar') completar(area, config);
        else if (config.tipo === 'clasificar') clasificar(area, config);
        else if (config.tipo === 'adivina') adivina(area, config);
        else if (config.tipo === 'emparejar') emparejar(area, config);
        else area.innerHTML = '<p class="juego-aviso">Tipo de juego desconocido: revise el archivo de datos.</p>';
      } catch (error) {
        area.innerHTML = '<p class="juego-aviso">No se pudo iniciar el juego: revise el archivo de datos.</p>';
        if (window.console) window.console.error(error);
      }
    }

    montar();
  }


  /* ==================== motor: quiz (opción múltiple) ==================== */

  function quiz(area, config) {
    const preguntas = config.preguntas;
    let indice = 0;
    let aciertos = 0;

    actualizarMarcador('Aciertos: 0');

    function pintar() {
      const pregunta = preguntas[indice];

      /* Las opciones se mezclan en cada partida (la correcta viaja aparte) */
      const opciones = barajar(pregunta.opciones.map(function (texto, i) {
        return { texto: texto, correcta: i === pregunta.correcta };
      }));

      area.innerHTML =
        '<p class="juego-progreso">Pregunta ' + (indice + 1) + ' de ' + preguntas.length + '</p>' +
        '<h2 class="juego-pregunta">' + esc(pregunta.texto) + '</h2>' +
        '<div class="juego-opciones">' +
          opciones.map(function (opcion) {
            return '<button type="button" class="juego-opcion" data-correcta="' + opcion.correcta + '">' +
              '<span class="juego-opcion-texto">' + esc(opcion.texto) + '</span>' +
              '<span class="juego-opcion-check" aria-hidden="true"></span>' +
              '</button>';
          }).join('') +
        '</div>' +
        '<div class="juego-feedback" role="status" aria-live="polite"></div>';

      $$('.juego-opcion', area).forEach(function (boton) {
        boton.addEventListener('click', function () {
          responder(boton);
        });
      });
    }

    function responder(botonElegido) {
      const correcta = botonElegido.dataset.correcta === 'true';
      if (correcta) aciertos++;
      actualizarMarcador('Aciertos: ' + aciertos);

      /* Se bloquean las opciones y se revela la correcta */
      $$('.juego-opcion', area).forEach(function (boton) {
        boton.disabled = true;
        if (boton.dataset.correcta === 'true') boton.classList.add('es-correcta');
      });
      if (!correcta) botonElegido.classList.add('es-incorrecta');

      const pregunta = preguntas[indice];
      $('.juego-feedback', area).innerHTML =
        '<p class="juego-feedback-titulo">' +
          (correcta ? '¡Correcto!' : 'No era la opción correcta') +
        '</p>' +
        '<p>' + esc(pregunta.explicacion) + '</p>' +
        '<button type="button" class="juego-boton" id="mj-siguiente">' +
          (indice + 1 < preguntas.length ? 'Siguiente pregunta' : 'Ver resultado') +
        '</button>';

      $('#mj-siguiente').addEventListener('click', function () {
        indice++;
        if (indice < preguntas.length) pintar();
        else pintarResultado(area, aciertos, preguntas.length);
      });
    }

    pintar();
  }


  /* ==================== motor: verdadero o falso ==================== */

  function verdaderoFalso(area, config) {
    const afirmaciones = config.afirmaciones;
    let indice = 0;
    let aciertos = 0;

    actualizarMarcador('Aciertos: 0');

    function pintar() {
      const afirmacion = afirmaciones[indice];

      area.innerHTML =
        '<p class="juego-progreso">Afirmación ' + (indice + 1) + ' de ' + afirmaciones.length + '</p>' +
        '<h2 class="juego-pregunta">' + esc(afirmacion.texto) + '</h2>' +
        '<div class="juego-opciones juego-opciones--vf">' +
          '<button type="button" class="juego-opcion juego-opcion--vf" data-eleccion="verdadero">' +
            '<span class="juego-opcion-texto">Verdadero</span>' +
            '<span class="juego-opcion-check" aria-hidden="true"></span>' +
          '</button>' +
          '<button type="button" class="juego-opcion juego-opcion--vf" data-eleccion="falso">' +
            '<span class="juego-opcion-texto">Falso</span>' +
            '<span class="juego-opcion-check" aria-hidden="true"></span>' +
          '</button>' +
        '</div>' +
        '<div class="juego-feedback" role="status" aria-live="polite"></div>';

      $$('.juego-opcion--vf', area).forEach(function (boton) {
        boton.addEventListener('click', function () {
          responder(boton);
        });
      });
    }

    function responder(botonElegido) {
      const afirmacion = afirmaciones[indice];
      const elegida = botonElegido.dataset.eleccion === 'verdadero';
      const correcta = elegida === afirmacion.respuesta;

      if (correcta) aciertos++;
      actualizarMarcador('Aciertos: ' + aciertos);

      $$('.juego-opcion--vf', area).forEach(function (boton) {
        boton.disabled = true;
      });
      botonElegido.classList.add(correcta ? 'es-correcta' : 'es-incorrecta');

      $('.juego-feedback', area).innerHTML =
        '<p class="juego-feedback-titulo">' +
          (correcta ? '¡Correcto! ' : 'Era ' + (afirmacion.respuesta ? 'verdadera. ' : 'falsa. ')) +
        '</p>' +
        '<p>' + esc(afirmacion.explicacion) + '</p>' +
        '<button type="button" class="juego-boton" id="mj-siguiente">' +
          (indice + 1 < afirmaciones.length ? 'Siguiente afirmación' : 'Ver resultado') +
        '</button>';

      $('#mj-siguiente').addEventListener('click', function () {
        indice++;
        if (indice < afirmaciones.length) pintar();
        else pintarResultado(area, aciertos, afirmaciones.length);
      });
    }

    pintar();
  }


  /* ==================== motor: ordenar pasos ==================== */

  function ordenar(area, config) {
    const ordenCorrecto = config.pasos.map(function (texto, i) {
      return { id: i, texto: texto };
    });

    let disponibles = barajar(ordenCorrecto);  // pasos sin ubicar (mezclados)
    let elegidos = [];                          // pasos en el orden elegido
    let comprobado = false;

    actualizarMarcador('Pasos ubicados: 0 de ' + ordenCorrecto.length);

    area.innerHTML =
      '<p class="juego-ayuda">Pulse los pasos en el orden correcto. Para devolver uno a la ' +
        'columna de disponibles, púlselo dentro de «Tu orden».</p>' +
      '<div class="ordenar-zonas">' +
        '<div class="ordenar-zona">' +
          '<h3 class="ordenar-titulo">Disponibles</h3>' +
          '<div class="ordenar-lista" id="mj-disponibles"></div>' +
        '</div>' +
        '<div class="ordenar-zona">' +
          '<h3 class="ordenar-titulo">Tu orden</h3>' +
          '<div class="ordenar-lista" id="mj-elegidos"></div>' +
        '</div>' +
      '</div>' +
      '<div class="juego-feedback" role="status" aria-live="polite"></div>' +
      '<div class="juego-acciones">' +
        '<button type="button" class="juego-boton" id="mj-comprobar">Comprobar</button>' +
      '</div>';

    pintarListas();
    $('#mj-comprobar').addEventListener('click', comprobar);

    /* Un solo manejador delegado para mover pasos entre columnas
       (se asigna con onclick para no acumularlo entre reinicios) */
    area.onclick = function (evento) {
      const item = evento.target.closest('.ordenar-item');
      if (!item || comprobado) return;

      const id = Number(item.dataset.id);
      if (item.closest('#mj-elegidos')) {
        const posicion = elegidos.findIndex(function (paso) { return paso.id === id; });
        if (posicion !== -1) disponibles.push(elegidos.splice(posicion, 1)[0]);
      } else {
        const posicion = disponibles.findIndex(function (paso) { return paso.id === id; });
        if (posicion !== -1) elegidos.push(disponibles.splice(posicion, 1)[0]);
      }

      actualizarMarcador('Pasos ubicados: ' + elegidos.length + ' de ' + ordenCorrecto.length);
      pintarListas();
    };

    function pintarListas() {
      const contDisponibles = $('#mj-disponibles');
      const contElegidos = $('#mj-elegidos');

      contDisponibles.innerHTML = disponibles.length
        ? disponibles.map(function (paso) {
            return '<button type="button" class="ordenar-item" data-id="' + paso.id + '">' +
              esc(paso.texto) + '</button>';
          }).join('')
        : '<p class="ordenar-vacio">No quedan pasos por ubicar.</p>';

      contElegidos.innerHTML = elegidos.length
        ? elegidos.map(function (paso, posicion) {
            return '<button type="button" class="ordenar-item" data-id="' + paso.id + '">' +
              '<span class="ordenar-item-num">' + (posicion + 1) + '</span>' +
              esc(paso.texto) + '</button>';
          }).join('')
        : '<p class="ordenar-vacio">Aún no hay pasos elegidos.</p>';

      const boton = $('#mj-comprobar');
      if (boton) boton.disabled = elegidos.length !== ordenCorrecto.length;
    }

    function comprobar() {
      if (elegidos.length !== ordenCorrecto.length || comprobado) return;
      comprobado = true;

      let aciertos = 0;
      const items = $$('#mj-elegidos .ordenar-item');

      elegidos.forEach(function (paso, posicion) {
        const bien = paso.id === posicion;
        if (bien) aciertos++;
        if (items[posicion]) items[posicion].classList.add(bien ? 'es-correcta' : 'es-incorrecta');
      });

      actualizarMarcador('Posiciones correctas: ' + aciertos + ' de ' + ordenCorrecto.length);

      const perfecto = aciertos === ordenCorrecto.length;
      $('.juego-feedback', area).innerHTML =
        '<p class="juego-feedback-titulo">' +
          (perfecto
            ? '¡Orden perfecto!'
            : 'Casi: ' + aciertos + ' de ' + ordenCorrecto.length + ' pasos en su lugar') +
        '</p>' +
        (perfecto ? '' :
          '<p>El orden correcto era:</p>' +
          '<ol class="ordenar-solucion">' +
            ordenCorrecto.map(function (paso) {
              return '<li>' + esc(paso.texto) + '</li>';
            }).join('') +
          '</ol>') +
        '<button type="button" class="juego-boton" id="mj-otra">Intentar de nuevo</button>';

      $('#mj-otra').addEventListener('click', function () {
        $('#mj-reiniciar').click();
      });
      $('#mj-comprobar').disabled = true;
    }
  }


  /* ==================== motor: memoria (encontrar pares) ==================== */

  function memoria(area, config) {
    const parejas = config.parejas;

    let cartas;           // [{par, texto, volteada, encontrada}]
    let primera = null;   // primera carta del intento en curso
    let bloqueo = false;  // mientras se muestran dos cartas sin par
    let intentos = 0;
    let hallados = 0;

    function reiniciar() {
      const base = [];
      parejas.forEach(function (pareja, i) {
        base.push({ par: i, texto: pareja.a });
        base.push({ par: i, texto: pareja.b });
      });

      cartas = barajar(base).map(function (carta) {
        return { par: carta.par, texto: carta.texto, volteada: false, encontrada: false };
      });

      primera = null;
      bloqueo = false;
      intentos = 0;
      hallados = 0;

      actualizarMarcador('Intentos: 0 · Pares: 0 de ' + parejas.length);

      area.innerHTML =
        '<p class="juego-ayuda">Voltea dos cartas: si forman un par, se quedan descubiertas.</p>' +
        '<div class="memoria-rejilla">' +
          cartas.map(function (carta, i) {
            return '<button type="button" class="memoria-carta" data-indice="' + i + '" ' +
                   'aria-label="Carta oculta">' +
                     '<span class="memoria-signo" aria-hidden="true">?</span>' +
                   '</button>';
          }).join('') +
        '</div>' +
        '<div class="juego-feedback" role="status" aria-live="polite"></div>';

      $$('.memoria-carta', area).forEach(function (boton) {
        boton.addEventListener('click', function () {
          voltear(boton, Number(boton.dataset.indice));
        });
      });
    }

    function voltear(boton, indice) {
      const carta = cartas[indice];
      if (bloqueo || carta.volteada || carta.encontrada) return;

      carta.volteada = true;
      boton.classList.add('volteada');
      boton.innerHTML = esc(carta.texto);
      boton.setAttribute('aria-label', carta.texto);

      if (primera === null) {
        primera = indice;
        return;
      }

      /* Segunda carta del intento */
      intentos++;
      const segunda = indice;

      if (cartas[primera].par === carta.par) {
        hallados++;
        cartas[primera].encontrada = carta.encontrada = true;
        marcar(primera);
        marcar(segunda);
        actualizarMarcador('Intentos: ' + intentos + ' · Pares: ' + hallados + ' de ' + parejas.length);
        if (hallados === parejas.length) terminar();
        primera = null;
      } else {
        actualizarMarcador('Intentos: ' + intentos + ' · Pares: ' + hallados + ' de ' + parejas.length);
        const paraTapar = [primera, segunda];
        primera = null;
        bloqueo = true;
        window.setTimeout(function () {
          paraTapar.forEach(tapar);
          bloqueo = false;
        }, reducirMovimiento() ? 250 : 900);
      }
    }

    function marcar(indice) {
      const boton = $('.memoria-carta[data-indice="' + indice + '"]', area);
      if (boton) {
        boton.classList.add('encontrada');
        boton.disabled = true;
      }
    }

    function tapar(indice) {
      cartas[indice].volteada = false;
      const boton = $('.memoria-carta[data-indice="' + indice + '"]', area);
      if (boton) {
        boton.classList.remove('volteada');
        boton.innerHTML = '<span class="memoria-signo" aria-hidden="true">?</span>';
        boton.setAttribute('aria-label', 'Carta oculta');
      }
    }

    function terminar() {
      $('.juego-feedback', area).innerHTML =
        '<div class="juego-resultado">' +
          '<p class="juego-resultado-puntaje">' + parejas.length + ' pares</p>' +
          '<p>¡Completado en ' + intentos + (intentos === 1 ? ' intento' : ' intentos') + '!</p>' +
          '<button type="button" class="juego-boton" id="mj-otra">Jugar de nuevo</button>' +
        '</div>';

      $('#mj-otra').addEventListener('click', function () {
        $('#mj-reiniciar').click();
      });
    }

    reiniciar();
  }


  /* ==================== motor: completar espacios ==================== */
  /* Cada frase: { texto: 'La ___ es la rama…', huecos: [{ opciones: [ ... ],
     correcta: 0 }] } — el texto se corta en cada '___' y cada hueco es un
     botón que recorre sus opciones (ninguna → primera → … → ninguna).    */

  function completar(area, config) {
    const frases = config.frases;
    const eleccion = [];             // por hueco: -1 = sin elegir
    let comprobado = false;

    function totalHuecos() {
      let total = 0;
      frases.forEach(function (frase) { total += frase.huecos.length; });
      return total;
    }

    function elegidos() {
      let n = 0;
      eleccion.forEach(function (valor) { if (valor !== -1) n++; });
      return n;
    }

    frases.forEach(function (frase) {
      frase.huecos.forEach(function () { eleccion.push(-1); });
    });

    actualizarMarcador('Huecos: 0 de ' + totalHuecos());

    area.innerHTML =
      '<p class="juego-ayuda">Pulsá cada hueco para recorrer sus opciones; ' +
        'cuando estén todos elegidos, pulsá «Comprobar».</p>' +
      '<div id="mj-completar"></div>' +
      '<div class="juego-feedback" role="status" aria-live="polite"></div>' +
      '<div class="juego-acciones">' +
        '<button type="button" class="juego-boton" id="mj-comprobar">Comprobar</button>' +
      '</div>';

    const contenedor = $('#mj-completar');
    const comprobarBoton = $('#mj-comprobar');
    comprobarBoton.disabled = true;      /* se habilita al llenar todos los huecos */

    frases.forEach(function (frase, i) {
      const div = document.createElement('div');
      div.className = 'completar-item';

      const partes = frase.texto.split('___');
      let html = '<p class="completar-texto">';
      partes.forEach(function (parte, j) {
        html += esc(parte);
        if (j < partes.length - 1) {
          const hueco = frase.huecos[j];
          html +=
            '<button type="button" class="completar-hueco" data-frase="' + i + '" data-hueco="' + j + '" ' +
                   'aria-label="Hueco de la frase ' + (i + 1) + ': ' +
                     esc(hueco.opciones.join(' · ')) + '">···</button>';
        }
      });
      html += '</p>';
      div.innerHTML = html;
      contenedor.appendChild(div);
    });

    /* Tocar un hueco cicla sus opciones (— → 1ª → 2ª → … → —) */
    contenedor.addEventListener('click', function (evento) {
      const huecoBoton = evento.target.closest('.completar-hueco');
      if (!huecoBoton || comprobado) return;

      const i = Number(huecoBoton.dataset.frase);
      const j = Number(huecoBoton.dataset.hueco);
      const hueco = frases[i].huecos[j];

      /* Índice lineal del hueco en la lista global de elecciones */
      let indice = 0;
      for (let f = 0; f < i; f++) indice += frases[f].huecos.length;
      indice += j;

      eleccion[indice] = (eleccion[indice] + 2) % (hueco.opciones.length + 1) - 1;
      const elegida = eleccion[indice];

      huecoBoton.textContent = elegida === -1 ? '···' : hueco.opciones[elegida];
      huecoBoton.setAttribute('aria-label', 'Hueco de la frase ' + (i + 1) + ': ' +
        esc(hueco.opciones.join(' · ')) +
        (elegida === -1 ? '' : ' — elegida: ' + esc(hueco.opciones[elegida])));

      actualizarMarcador('Huecos: ' + elegidos() + ' de ' + totalHuecos());
      comprobarBoton.disabled = elegidos() !== totalHuecos();
    });

    comprobarBoton.addEventListener('click', function () {
      if (comprobado || elegidos() !== totalHuecos()) return;
      comprobado = true;

      let aciertos = 0;
      $$('.completar-hueco', area).forEach(function (huecoBoton) {
        const i = Number(huecoBoton.dataset.frase);
        const j = Number(huecoBoton.dataset.hueco);

        let indice = 0;
        for (let f = 0; f < i; f++) indice += frases[f].huecos.length;
        indice += j;

        const hueco = frases[i].huecos[j];
        huecoBoton.disabled = true;
        if (eleccion[indice] === hueco.correcta) {
          aciertos++;
          huecoBoton.classList.add('es-correcta');
        } else {
          huecoBoton.classList.add('es-incorrecta');
        }
      });

      actualizarMarcador('Respuestas correctas: ' + aciertos + ' de ' + totalHuecos());
      comprobarBoton.disabled = true;

      const perfecto = aciertos === totalHuecos();
      $('.juego-feedback', area).innerHTML =
        '<p class="juego-feedback-titulo">' +
          (perfecto
            ? '¡Completado perfecto!'
            : 'Casi: ' + aciertos + ' de ' + totalHuecos() + ' huecos bien') +
        '</p>' +
        (perfecto ? '' :
          '<p>Las palabras correctas eran:</p>' +
          '<ul class="ordenar-solucion">' +
            frases.map(function (frase) {
              return '<li>' +
                frase.huecos.map(function (hueco) { return esc(hueco.opciones[hueco.correcta]); }).join(' · ') +
                '</li>';
            }).join('') +
          '</ul>') +
        '<button type="button" class="juego-boton" id="mj-otra">Intentar de nuevo</button>';

      $('#mj-otra').addEventListener('click', function () {
        $('#mj-reiniciar').click();
      });
    });
  }


  /* ==================== motor: clasificar ==================== */
  /* Config: { categorias: [ 'MRU', 'MRUA', … ], items: [ { texto, categoria } ] }.
     Cada item es una tarjeta con un botón por categoría; se marca la que
     corresponda y «Comprobar» valida todas. */

  function clasificar(area, config) {
    const categorias = config.categorias;
    const items = config.items.map(function (item) {
      return { texto: item.texto, correcta: item.categoria, elegida: null };
    });
    let comprobado = false;

    actualizarMarcador('Clasificados: 0 de ' + items.length);

    area.innerHTML =
      '<p class="juego-ayuda">Pulsá la categoría que corresponde a cada ' +
        'tarjeta; se puede cambiar antes de comprobar.</p>' +
      '<div id="mj-clasificar"></div>' +
      '<div class="juego-feedback" role="status" aria-live="polite"></div>' +
      '<div class="juego-acciones">' +
        '<button type="button" class="juego-boton" id="mj-comprobar" disabled>Comprobar</button>' +
      '</div>';

    const contenedor = $('#mj-clasificar');

    items.forEach(function (item, i) {
      const div = document.createElement('div');
      div.className = 'clasificar-item';
      let html = '<p class="clasificar-texto">' + esc(item.texto) + '</p>';
      html += '<div class="clasificar-chips">';
      categorias.forEach(function (categoria, j) {
        html +=
          '<button type="button" class="clasificar-chip" data-item="' + i + '" data-cat="' + j + '" ' +
                 'aria-pressed="false">' + esc(categoria) + '</button>';
      });
      html += '</div>';
      div.innerHTML = html;
      contenedor.appendChild(div);
    });

    contenedor.addEventListener('click', function (evento) {
      const chip = evento.target.closest('.clasificar-chip');
      if (!chip || comprobado) return;

      const i = Number(chip.dataset.item);
      const j = Number(chip.dataset.cat);

      /* Dentro de la tarjeta solo una categoría queda marcada */
      $$('.clasificar-chip[data-item="' + i + '"]', contenedor).forEach(function (otra) {
        const misma = otra === chip;
        otra.setAttribute('aria-pressed', String(misma));
      });

      items[i].elegida = j;
      const clasificados = items.filter(function (item) { return item.elegida !== null; }).length;
      actualizarMarcador('Clasificados: ' + clasificados + ' de ' + items.length);
      $('#mj-comprobar').disabled = clasificados !== items.length;
    });

    $('#mj-comprobar').addEventListener('click', function () {
      if (comprobado) return;
      const clasificados = items.filter(function (item) { return item.elegida !== null; }).length;
      if (clasificados !== items.length) return;
      comprobado = true;

      let aciertos = 0;
      $$('.clasificar-item', contenedor).forEach(function (tarjeta, i) {
        const bien = items[i].elegida === items[i].correcta;
        if (bien) aciertos++;
        tarjeta.classList.add(bien ? 'es-correcta' : 'es-incorrecta');
        $$('.clasificar-chip', tarjeta).forEach(function (chip) { chip.disabled = true; });
      });

      actualizarMarcador('Correctas: ' + aciertos + ' de ' + items.length);
      $('#mj-comprobar').disabled = true;

      const perfecto = aciertos === items.length;
      $('.juego-feedback', area).innerHTML =
        '<p class="juego-feedback-titulo">' +
          (perfecto ? '¡Clasificación perfecta!' : 'Casi: ' + aciertos + ' de ' + items.length) +
        '</p>' +
        (perfecto ? '' :
          '<p>La correspondencia correcta era:</p>' +
          '<ul class="ordenar-solucion">' +
            items.map(function (item) {
              return '<li>' + esc(item.texto) + ' — <strong>' + esc(categorias[item.correcta]) + '</strong></li>';
            }).join('') +
          '</ul>') +
        '<button type="button" class="juego-boton" id="mj-otra">Intentar de nuevo</button>';

      $('#mj-otra').addEventListener('click', function () {
        $('#mj-reiniciar').click();
      });
    });
  }


  /* ==================== motor: adivina el término ==================== */
  /* Config: { palabras: [ { palabra: 'RAPIDEZ', pista: '…' } ] }. Se va
     destapando letra por letra con un teclado en pantalla; se permiten
     hasta 6 errores por palabra. */

  function adivina(area, config) {
    const palabras = config.palabras;
    const LETRAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const MAX_ERRORES = 6;

    let indice = 0;
    let aciertos = 0;
    let errores = 0;
    let palabra = '';
    let halladas = {};

    actualizarMarcador('Palabras: 0 de ' + palabras.length + ' · Errores: 0 de ' + MAX_ERRORES);
    pintar();

    function marcador() {
      actualizarMarcador('Palabras: ' + aciertos + ' de ' + palabras.length +
        ' · Errores: ' + errores + ' de ' + MAX_ERRORES);
    }

    function pintar() {
      const actual = palabras[indice];
      palabra = String(actual.palabra).toUpperCase().replace(/[^A-Z]/g, '');
      halladas = {};
      errores = 0;

      area.innerHTML =
        '<p class="juego-progreso">Palabra ' + (indice + 1) + ' de ' + palabras.length + '</p>' +
        '<div class="adivina-pista">' +
          '<span class="adivina-pista-etiqueta">Pista</span>' +
          esc(actual.pista) +
        '</div>' +
        '<div class="adivina-letras" id="mj-letras"></div>' +
        '<div class="adivina-teclado" id="mj-teclado"></div>' +
        '<div class="juego-feedback" role="status" aria-live="polite"></div>';

      const contLetras = $('#mj-letras');
      palabra.split('').forEach(function () {
        const hueco = document.createElement('span');
        hueco.className = 'adivina-letra adivina-letra--vacia';
        contLetras.appendChild(hueco);
      });

      const teclado = $('#mj-teclado');
      LETRAS.forEach(function (letra) {
        const tecla = document.createElement('button');
        tecla.type = 'button';
        tecla.className = 'adivina-tecla';
        tecla.textContent = letra;
        tecla.setAttribute('aria-label', 'Probar la letra ' + letra);
        teclado.appendChild(tecla);
      });

      teclado.addEventListener('click', function (evento) {
        const tecla = evento.target.closest('.adivina-tecla');
        if (!tecla || tecla.disabled) return;
        intentar(tecla, tecla.textContent);
      });

      marcador();
    }

    function pintarLetras() {
      const huecos = $$('#mj-letras .adivina-letra', area);
      palabra.split('').forEach(function (letra, i) {
        const hueco = huecos[i];
        if (!hueco) return;
        if (halladas[letra]) {
          hueco.textContent = letra;
          hueco.classList.remove('adivina-letra--vacia');
        }
      });
    }

    function intentar(tecla, letra) {
      tecla.disabled = true;

      if (palabra.indexOf(letra) !== -1) {
        halladas[letra] = true;
        tecla.classList.add('adivina-tecla--acierto');
        pintarLetras();

        const completa = palabra.split('').every(function (l) { return halladas[l]; });
        if (completa) {
          aciertos++;
          marcador();
          $('.juego-feedback', area).innerHTML =
            '<p class="juego-feedback-titulo">¡La palabra era ' + esc(palabra) + '!</p>' +
            '<button type="button" class="juego-boton" id="mj-siguiente">' +
              (indice + 1 < palabras.length ? 'Siguiente palabra' : 'Ver resultado') +
            '</button>';
          $('#mj-siguiente').addEventListener('click', siguiente);
          $$('#mj-teclado .adivina-tecla', area).forEach(function (t) { t.disabled = true; });
        }
      } else {
        errores++;
        tecla.classList.add('adivina-tecla--fallo');
        marcador();

        if (errores >= MAX_ERRORES) {
          /* Se acabaron los errores: se revela la palabra */
          palabra.split('').forEach(function (letra, i) {
            if (!halladas[letra]) {
              const hueco = $$('#mj-letras .adivina-letra', area)[i];
              if (hueco) {
                hueco.textContent = letra;
                hueco.classList.add('adivina-letra--fallo');
              }
            }
          });
          $$('#mj-teclado .adivina-tecla', area).forEach(function (t) { t.disabled = true; });

          $('.juego-feedback', area).innerHTML =
            '<p class="juego-feedback-titulo">Se agotaron los intentos</p>' +
            '<p>La palabra era <strong>' + esc(palabra) + '</strong>.</p>' +
            '<button type="button" class="juego-boton" id="mj-siguiente">' +
              (indice + 1 < palabras.length ? 'Siguiente palabra' : 'Ver resultado') +
            '</button>';
          $('#mj-siguiente').addEventListener('click', siguiente);
        }
      }
    }

    function siguiente() {
      indice++;
      if (indice < palabras.length) pintar();
      else pintarResultado(area, aciertos, palabras.length);
    }
  }


  /* ==================== motor: emparejar dos columnas ==================== */
  /* Config: { parejas: [ { a: 'Rapidez', b: 'Magnitud escalar…' } ] }.
     La columna izquierda queda fija; la derecha llega mezclada. Se toca un
     ítem de la izquierda y después el de la derecha que le corresponde
     (o al revés): ambos quedan vinculados con número. Tocar un ítem ya
     vinculado deshace el enlace. */

  function emparejar(area, config) {
    const parejas = config.parejas;
    const izquierda = parejas.map(function (pareja, i) {
      return { texto: pareja.a, indice: i };
    });
    const derecha = barajar(parejas.map(function (pareja, i) {
      return { texto: pareja.b, correcta: i };
    }));

    let enlaces = [];              // [{ a: índice izquierda, b: índice derecha }]
    let seleccion = null;          // ítem de la izquierda elegido para enlazar
    let comprobado = false;

    actualizarMarcador('Enlaces: 0 de ' + parejas.length);

    area.innerHTML =
      '<p class="juego-ayuda">Pulsá un ítem de la izquierda y después su ' +
        'pareja de la derecha (o al revés). Tocar un ítem ya unido deshace ' +
        'el enlace. Cuando estén todos unidos, pulsá «Comprobar».</p>' +
      '<div class="ordenar-zonas">' +
        '<div class="ordenar-zona">' +
          '<h3 class="ordenar-titulo">Conceptos</h3>' +
          '<div class="ordenar-lista" id="mj-izquierda"></div>' +
        '</div>' +
        '<div class="ordenar-zona">' +
          '<h3 class="ordenar-titulo">Definiciones</h3>' +
          '<div class="ordenar-lista" id="mj-derecha"></div>' +
        '</div>' +
      '</div>' +
      '<div class="juego-feedback" role="status" aria-live="polite"></div>' +
      '<div class="juego-acciones">' +
        '<button type="button" class="juego-boton" id="mj-comprobar" disabled>Comprobar</button>' +
      '</div>';

    pintarColumnas();

    function pintarColumnas() {
      const contIzq = $('#mj-izquierda');
      const contDer = $('#mj-derecha');

      contIzq.innerHTML = izquierda.map(function (item) {
        return '<button type="button" class="ordenar-item" data-lado="a" data-indice="' + item.indice + '">' +
          esc(item.texto) + '</button>';
      }).join('');

      contDer.innerHTML = derecha.map(function (item, j) {
        return '<button type="button" class="ordenar-item" data-lado="b" data-indice="' + j + '">' +
          esc(item.texto) + '</button>';
      }).join('');
    }

    function refrescar() {
      /* Pinta números y estados de los enlaces actuales (la selección puede
         ser del lado izquierdo (número) o del derecho (objeto)) */
      $$('#mj-izquierda .ordenar-item', area).forEach(function (boton) {
        const i = Number(boton.dataset.indice);
        const enlace = enlaces.filter(function (e) { return e.a === i; })[0];
        boton.classList.toggle('esta-vinculada', !!enlace);
        boton.classList.toggle('esta-seleccionada',
          seleccion !== null && typeof seleccion === 'number' && seleccion === i);
        quitarNumero(boton);
        if (enlace) ponerNumero(boton, enlaces.indexOf(enlace) + 1);
      });

      $$('#mj-derecha .ordenar-item', area).forEach(function (boton) {
        const j = Number(boton.dataset.indice);
        const enlace = enlaces.filter(function (e) { return e.b === j; })[0];
        boton.classList.toggle('esta-vinculada', !!enlace);
        boton.classList.toggle('esta-seleccionada',
          seleccion !== null && typeof seleccion === 'object' && seleccion.indice === j);
        quitarNumero(boton);
        if (enlace) ponerNumero(boton, enlaces.indexOf(enlace) + 1);
      });

      actualizarMarcador('Enlaces: ' + enlaces.length + ' de ' + parejas.length);
      const boton = $('#mj-comprobar');
      if (boton) boton.disabled = enlaces.length !== parejas.length;
    }

    function quitarNumero(boton) {
      const numero = boton.querySelector('.ordenar-item-num');
      if (numero) numero.remove();
    }

    function ponerNumero(boton, n) {
      boton.insertAdjacentHTML('afterbegin',
        '<span class="ordenar-item-num">' + n + '</span>');
    }

    area.addEventListener('click', function (evento) {
      const boton = evento.target.closest('.ordenar-item');
      if (!boton || comprobado) return;

      const lado = boton.dataset.lado;
      const indice = Number(boton.dataset.indice);

      /* ¿Ya está vinculado? Se deshace ese enlace */
      const existente = enlaces.filter(function (e) {
        return (lado === 'a' && e.a === indice) || (lado === 'b' && e.b === indice);
      })[0];
      if (existente) {
        enlaces.splice(enlaces.indexOf(existente), 1);
        seleccion = null;
        refrescar();
        return;
      }

      if (seleccion === null) {
        seleccion = lado === 'a' ? indice : { lado: lado, indice: indice };
        /* Si el primer toque fue de la derecha, se guarda (lado b) y se
           marca visualmente también */
        refrescar();
        return;
      }

      /* Segundo toque: crear el enlace si los lados son distintos */
      const primeroIzquierda = typeof seleccion === 'number';
      if (lado === 'a') {
        if (primeroIzquierda) { seleccion = indice; refrescar(); return; }  /* mismo lado: cambia la selección */
        enlaces.push({ a: indice, b: seleccion.indice });
      } else {
        if (!primeroIzquierda) { seleccion = { lado: lado, indice: indice }; refrescar(); return; }
        enlaces.push({ a: seleccion, b: indice });
      }
      seleccion = null;
      refrescar();
    });

    refrescar();

    $('#mj-comprobar').addEventListener('click', function () {
      if (comprobado || enlaces.length !== parejas.length) return;
      comprobado = true;

      let aciertos = 0;
      enlaces.forEach(function (enlace) {
        const bien = derecha[enlace.b].correcta === enlace.a;
        if (bien) aciertos++;

        $$('#mj-izquierda .ordenar-item', area).forEach(function (boton) {
          if (Number(boton.dataset.indice) === enlace.a) {
            boton.classList.add(bien ? 'es-correcta' : 'es-incorrecta');
          }
        });
        $$('#mj-derecha .ordenar-item', area).forEach(function (boton) {
          if (Number(boton.dataset.indice) === enlace.b) {
            boton.classList.add(bien ? 'es-correcta' : 'es-incorrecta');
          }
        });
      });

      actualizarMarcador('Enlaces correctos: ' + aciertos + ' de ' + parejas.length);
      $('#mj-comprobar').disabled = true;

      const perfecto = aciertos === parejas.length;
      $('.juego-feedback', area).innerHTML =
        '<p class="juego-feedback-titulo">' +
          (perfecto ? '¡Todos los pares bien unidos!' : 'Casi: ' + aciertos + ' de ' + parejas.length) +
        '</p>' +
        (perfecto ? '' :
          '<p>La correspondencia correcta era:</p>' +
          '<ul class="ordenar-solucion">' +
            parejas.map(function (pareja) {
              return '<li>' + esc(pareja.a) + ' — ' + esc(pareja.b) + '</li>';
            }).join('') +
          '</ul>') +
        '<button type="button" class="juego-boton" id="mj-otra">Intentar de nuevo</button>';

      $('#mj-otra').addEventListener('click', function () {
        $('#mj-reiniciar').click();
      });
    });
  }


  /* --------------------------- API pública --------------------------- */

  return { iniciar: iniciar };

}());

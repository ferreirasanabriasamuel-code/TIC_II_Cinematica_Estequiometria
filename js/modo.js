/* ============================================================================
   modo.js — Modo claro / oscuro
   ----------------------------------------------------------------------------
   Lo cargan index.html y todas las páginas de juegos (junto con
   css/modo-oscuro.css). Se encarga de:

     1. Aplicar el modo guardado en localStorage (la primera aplicación la
        hace un script INLINE en el <head> de cada página, antes del primer
        render, para evitar un destello de tema equivocado).
     2. Conectar todos los botones .interruptor-modo (portada, barra del
        panel y páginas de juego) mediante delegación: los botones pueden
        aparecer más tarde (los paneles se construyen con JavaScript).
     3. Mantener accesible el interruptor: es un botón con aria-pressed y
        aria-label que se actualizan al cambiar de modo; funciona con
        teclado (Enter / Espacio) y muestra el anillo de foco.

   La preferencia se guarda en localStorage bajo la clave 'tp-ciencias-modo'
   ('claro' | 'oscuro'). Si nunca se eligió nada, se respeta la
   preferencia del sistema (prefers-color-scheme).
   ========================================================================== */

window.ModoOscuro = (function () {
  'use strict';

  var CLAVE = 'tp-ciencias-modo';

  function esOscuro() {
    return document.documentElement.getAttribute('data-modo') === 'oscuro';
  }

  function guardar(modo) {
    try {
      window.localStorage.setItem(CLAVE, modo);
    } catch (e) {
      /* Sin almacenamiento disponible: la preferencia no se recuerda,
         pero el cambio de modo sí funciona durante la visita. */
    }
  }

  function actualizarInterruptores() {
    var oscuro = esOscuro();
    var botones = document.querySelectorAll('.interruptor-modo');
    for (var i = 0; i < botones.length; i++) {
      var boton = botones[i];
      boton.setAttribute('aria-pressed', String(oscuro));
      boton.setAttribute('aria-label', oscuro
        ? 'Desactivar el modo oscuro (volver al modo claro)'
        : 'Activar el modo oscuro');
    }
  }

  function aplicar(modo) {
    if (modo === 'oscuro') {
      document.documentElement.setAttribute('data-modo', 'oscuro');
    } else {
      document.documentElement.removeAttribute('data-modo');
    }
    guardar(modo);
    actualizarInterruptores();
  }

  function alternar() {
    aplicar(esOscuro() ? 'claro' : 'oscuro');
  }

  /* Delegación: atrapa el clic de cualquier .interruptor-modo, incluso los
     que se agreguen después (paneles construidos por principal.js). */
  document.addEventListener('click', function (evento) {
    var boton = evento.target.closest
      ? evento.target.closest('.interruptor-modo')
      : null;
    if (!boton) return;
    alternar();
  });

  document.addEventListener('DOMContentLoaded', actualizarInterruptores);

  /* API pública: principal.js la usa para refrescar los interruptores de
     los paneles recién construidos. */
  return {
    alternar: alternar,
    aplicar: aplicar,
    esOscuro: esOscuro,
    actualizarInterruptores: actualizarInterruptores,
  };

}());

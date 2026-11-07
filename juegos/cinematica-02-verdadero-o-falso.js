/* ============================================================
   Datos del juego "¿Verdadero o falso?" (Cinemática)
   ------------------------------------------------------------
   Edite este archivo para cambiar las preguntas, afirmaciones,
   pasos o pares. El motor (js/motor-juegos.js) hace el resto.

   Formatos según el tipo de juego:
     quiz            → preguntas: [ { texto, opciones[], correcta, explicacion } ]
     verdadero-falso → afirmaciones: [ { texto, respuesta, explicacion } ]
     ordenar         → pasos: [ ... ]  (en el orden correcto)
     memoria         → parejas: [ { a, b } ]
   ============================================================ */

MotorJuegos.iniciar(
{
  "tipo": "verdadero-falso",
  "afirmaciones": [
    {
      "texto": "La distancia recorrida y el módulo del desplazamiento siempre coinciden.",
      "respuesta": false,
      "explicacion": "Solo coinciden cuando el movimiento es en línea recta y sin cambiar de sentido; si hay vueltas o cambios de dirección, la distancia es mayor."
    },
    {
      "texto": "La rapidez media es una magnitud escalar.",
      "respuesta": true,
      "explicacion": "Se calcula dividiendo la distancia recorrida (una magnitud escalar) entre el tiempo empleado."
    },
    {
      "texto": "En el MRUA, la velocidad varía en cantidades iguales en tiempos iguales.",
      "respuesta": true,
      "explicacion": "Eso es exactamente lo que significa una aceleración constante."
    },
    {
      "texto": "Un móvil puede tener velocidad y aceleración de signos opuestos.",
      "respuesta": true,
      "explicacion": "Ocurre al frenar: la velocidad apunta en un sentido y la aceleración en el contrario (movimiento retardado)."
    },
    {
      "texto": "La trayectoria de un cuerpo es la misma para cualquier observador.",
      "respuesta": false,
      "explicacion": "Depende del sistema de referencia: para quien viaja en un tren, un objeto suelto cae en línea recta; para quien está en el andén, describe una parábola."
    }
  ]
}
);

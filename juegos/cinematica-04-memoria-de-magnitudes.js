/* ============================================================
   Datos del juego "Memoria de magnitudes" (Cinemática)
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
  "tipo": "memoria",
  "parejas": [
    {
      "a": "Velocidad",
      "b": "m/s"
    },
    {
      "a": "Aceleración",
      "b": "m/s²"
    },
    {
      "a": "Desplazamiento",
      "b": "metro (m)"
    },
    {
      "a": "Tiempo",
      "b": "segundo (s)"
    },
    {
      "a": "Velocidad media",
      "b": "Δx / Δt"
    },
    {
      "a": "Aceleración media",
      "b": "Δv / Δt"
    }
  ]
}
);

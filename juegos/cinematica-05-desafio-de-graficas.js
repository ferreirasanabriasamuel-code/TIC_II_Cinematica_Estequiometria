/* ============================================================
   Datos del juego "Desafío de gráficas" (Cinemática)
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
  "tipo": "quiz",
  "preguntas": [
    {
      "texto": "Una gráfica posición–tiempo con recta inclinada y pendiente constante corresponde a…",
      "opciones": [
        "Un MRU",
        "Un MRUA",
        "Reposo",
        "Un movimiento con aceleración variable"
      ],
      "correcta": 0,
      "explicacion": "Pendiente constante significa velocidad constante: eso es exactamente un MRU."
    },
    {
      "texto": "Una gráfica posición–tiempo horizontal corresponde a…",
      "opciones": [
        "Reposo",
        "Un MRU",
        "Un MRUA",
        "Una caída libre"
      ],
      "correcta": 0,
      "explicacion": "La posición no cambia con el tiempo: la velocidad es cero, el cuerpo está en reposo."
    },
    {
      "texto": "Una gráfica velocidad–tiempo horizontal corresponde a…",
      "opciones": [
        "Velocidad constante (MRU)",
        "Reposo",
        "Aceleración creciente",
        "Desplazamiento nulo"
      ],
      "correcta": 0,
      "explicacion": "La velocidad no cambia: la pendiente de la gráfica (la aceleración) es cero."
    },
    {
      "texto": "En una gráfica velocidad–tiempo, la pendiente representa…",
      "opciones": [
        "La aceleración",
        "La velocidad",
        "El desplazamiento",
        "La posición"
      ],
      "correcta": 0,
      "explicacion": "La pendiente es Δv/Δt, es decir, la aceleración."
    },
    {
      "texto": "Una gráfica velocidad–tiempo recta y creciente corresponde a…",
      "opciones": [
        "Un MRUA con aceleración positiva",
        "Un MRU",
        "Reposo",
        "Un movimiento con aceleración variable"
      ],
      "correcta": 0,
      "explicacion": "La velocidad aumenta linealmente con el tiempo: aceleración constante y positiva."
    }
  ]
}
);

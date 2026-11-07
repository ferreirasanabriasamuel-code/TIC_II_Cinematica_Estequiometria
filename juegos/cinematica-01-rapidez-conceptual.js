/* ============================================================
   Datos del juego "Rapidez conceptual" (Cinemática)
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
      "texto": "¿Qué estudia la cinemática?",
      "opciones": [
        "El movimiento de los cuerpos, sin considerar sus causas",
        "Las fuerzas que producen el movimiento",
        "La composición interna de la materia",
        "La energía de los cuerpos en reposo"
      ],
      "correcta": 0,
      "explicacion": "La cinemática describe el movimiento (posición, velocidad y aceleración); las causas del movimiento las estudia la dinámica."
    },
    {
      "texto": "En el movimiento rectilíneo uniforme (MRU), la aceleración es…",
      "opciones": [
        "Nula",
        "Constante y distinta de cero",
        "Cada vez mayor",
        "Igual a la gravedad"
      ],
      "correcta": 0,
      "explicacion": "«Uniforme» significa velocidad constante: si la velocidad no cambia, la aceleración es cero."
    },
    {
      "texto": "La pendiente de una gráfica posición–tiempo representa…",
      "opciones": [
        "La velocidad",
        "La aceleración",
        "El desplazamiento total",
        "El tiempo"
      ],
      "correcta": 0,
      "explicacion": "En una gráfica x–t, la pendiente es Δx/Δt, es decir, la velocidad."
    },
    {
      "texto": "En caída libre (despreciando la resistencia del aire), un cuerpo…",
      "opciones": [
        "Cae con g ≈ 9,8 m/s², cualquiera sea su masa",
        "Cae con g ≈ 9,8 m/s² solo si es pesado",
        "Baja con velocidad constante",
        "Sube con aceleración constante"
      ],
      "correcta": 0,
      "explicacion": "Sin resistencia del aire, todos los cuerpos caen con la misma aceleración, g ≈ 9,8 m/s², dirigida hacia abajo."
    },
    {
      "texto": "El área bajo la curva de una gráfica velocidad–tiempo equivale a…",
      "opciones": [
        "El desplazamiento",
        "La aceleración",
        "La rapidez media",
        "La posición inicial"
      ],
      "correcta": 0,
      "explicacion": "v · t tiene unidades de longitud: geométricamente, ese producto es el área bajo la curva."
    }
  ]
}
);

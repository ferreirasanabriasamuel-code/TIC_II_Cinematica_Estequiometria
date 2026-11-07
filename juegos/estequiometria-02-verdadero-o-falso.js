/* ============================================================
   Datos del juego "¿Verdadero o falso?" (Estequiometría)
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
      "texto": "Un mol de cualquier sustancia contiene el mismo número de entidades que un mol de otra.",
      "respuesta": true,
      "explicacion": "Ambos contienen 6,022 × 10²³ entidades; lo que cambia entre sustancias es la masa de ese mol."
    },
    {
      "texto": "La masa de un mol es la misma para todas las sustancias.",
      "respuesta": false,
      "explicacion": "Depende de la masa molar: un mol de agua pesa 18 g y un mol de O₂ pesa 32 g."
    },
    {
      "texto": "La masa molar se expresa en g/mol.",
      "respuesta": true,
      "explicacion": "Gramos por mol; numéricamente coincide con la masa atómica o molecular expresada en u."
    },
    {
      "texto": "El porcentaje de rendimiento de una reacción puede superar el 100 %.",
      "respuesta": false,
      "explicacion": "Comparado con el valor teórico, el rendimiento real no supera el 100 %; si lo hiciera, habría un error de medición o de cálculo."
    },
    {
      "texto": "Según Lavoisier, la masa total se conserva en una reacción química.",
      "respuesta": true,
      "explicacion": "La masa de los reactivos es igual a la masa de los productos: por eso las ecuaciones químicas se balancean."
    }
  ]
}
);

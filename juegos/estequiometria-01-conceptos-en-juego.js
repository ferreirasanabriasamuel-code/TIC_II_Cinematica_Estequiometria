/* ============================================================
   Datos del juego "Conceptos en juego" (Estequiometría)
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
      "texto": "¿Qué estudia la estequiometría?",
      "opciones": [
        "Las relaciones cuantitativas entre reactivos y productos de una reacción",
        "La velocidad con la que ocurren las reacciones",
        "La estructura electrónica de los átomos",
        "Las propiedades físicas de los gases"
      ],
      "correcta": 0,
      "explicacion": "La estequiometría trabaja con cantidades (masa, moles y volumen) a partir de la ecuación química balanceada."
    },
    {
      "texto": "¿Cuántas entidades hay, aproximadamente, en un mol de sustancia?",
      "opciones": [
        "6,022 × 10²³",
        "6,022 × 10⁻²³",
        "22,4",
        "12"
      ],
      "correcta": 0,
      "explicacion": "Es el número de Avogadro: un mol siempre contiene 6,022 × 10²³ entidades elementales."
    },
    {
      "texto": "La masa molar del agua (H₂O) es aproximadamente…",
      "opciones": [
        "18 g/mol",
        "9 g/mol",
        "22,4 g/mol",
        "10 g/mol"
      ],
      "correcta": 0,
      "explicacion": "Se suman 2 · 1 u (hidrógeno) + 16 u (oxígeno) = 18 u, y numéricamente eso da 18 g/mol."
    },
    {
      "texto": "Los coeficientes de una ecuación química balanceada indican…",
      "opciones": [
        "La proporción en moles de reactivos y productos",
        "La masa en gramos de cada sustancia",
        "La concentración de la disolución",
        "La temperatura de la reacción"
      ],
      "correcta": 0,
      "explicacion": "En 2 H₂ + O₂ → 2 H₂O, los coeficientes 2, 1 y 2 expresan la proporción en moles."
    },
    {
      "texto": "El reactivo limitante de una reacción es…",
      "opciones": [
        "El que se consume por completo primero y limita el producto",
        "El que sobra al final de la reacción",
        "El de mayor masa molar",
        "El que se encuentra en estado gaseoso"
      ],
      "correcta": 0,
      "explicacion": "El reactivo limitante determina la cantidad máxima de producto; el que sobra queda como reactivo en exceso."
    }
  ]
}
);

/* ============================================================
   Datos del juego "Convierte con el mol" (Estequiometría)
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
      "texto": "¿Cómo se calculan los moles a partir de la masa?",
      "opciones": [
        "n = m / M (masa dividida entre la masa molar)",
        "n = m · M (masa multiplicada por la masa molar)",
        "n = M / m (masa molar dividida entre la masa)",
        "n = m + M"
      ],
      "correcta": 0,
      "explicacion": "Con la masa en gramos y la masa molar en g/mol, el cociente entrega los moles."
    },
    {
      "texto": "La masa molar del CO₂ es aproximadamente…",
      "opciones": [
        "44 g/mol",
        "28 g/mol",
        "12 g/mol",
        "32 g/mol"
      ],
      "correcta": 0,
      "explicacion": "12 u (C) + 2 · 16 u (O) = 44 u, es decir, 44 g/mol."
    },
    {
      "texto": "¿Cuántos moles hay en 36 g de agua (M = 18 g/mol)?",
      "opciones": [
        "2 mol",
        "0,5 mol",
        "18 mol",
        "36 mol"
      ],
      "correcta": 0,
      "explicacion": "n = m / M = 36 g ÷ 18 g/mol = 2 mol."
    },
    {
      "texto": "En 2 H₂ + O₂ → 2 H₂O, por cada mol de O₂ que reacciona se forman…",
      "opciones": [
        "2 mol de agua",
        "1 mol de agua",
        "4 mol de agua",
        "0,5 mol de agua"
      ],
      "correcta": 0,
      "explicacion": "Los coeficientes indican la proporción 1 de O₂ : 2 de H₂O, medida en moles."
    },
    {
      "texto": "¿Cuántas moléculas hay, aproximadamente, en 2 mol de O₂?",
      "opciones": [
        "1,2 × 10²⁴",
        "6,0 × 10²³",
        "3,0 × 10²³",
        "2 × 10²³"
      ],
      "correcta": 0,
      "explicacion": "2 · 6,022 × 10²³ ≈ 1,2 × 10²⁴ moléculas."
    }
  ]
}
);

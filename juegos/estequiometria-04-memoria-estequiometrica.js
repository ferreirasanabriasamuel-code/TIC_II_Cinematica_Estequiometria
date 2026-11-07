/* ============================================================
   Datos del juego "Memoria estequiométrica" (Estequiometría)
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
      "a": "Mol",
      "b": "cantidad de sustancia"
    },
    {
      "a": "Masa molar",
      "b": "g/mol"
    },
    {
      "a": "Número de Avogadro",
      "b": "6,022 × 10²³"
    },
    {
      "a": "Reactivo limitante",
      "b": "se consume primero"
    },
    {
      "a": "Rendimiento",
      "b": "real / teórico"
    },
    {
      "a": "Coeficiente estequiométrico",
      "b": "proporción en moles"
    }
  ]
}
);

/* ============================================================
   Datos del juego "Completa el concepto" (Estequiometría)
   ------------------------------------------------------------
   Edite este archivo para cambiar las frases y sus opciones.
   El motor (js/motor-juegos.js) hace el resto.

   Formato del tipo "completar":
     frases: [ { texto: '… ___ …', huecos: [ { opciones: [ ... ], correcta: 0 } ] } ]
   ============================================================ */

MotorJuegos.iniciar(
{
  "tipo": "completar",
  "frases": [
    {
      "texto": "Un ___ contiene 6,022 × 10²³ entidades elementales.",
      "huecos": [
        { "opciones": ["gramo", "mol", "litro"], "correcta": 1 }
      ]
    },
    {
      "texto": "La ___ molar es la masa de un mol de sustancia y se expresa en g/mol.",
      "huecos": [
        { "opciones": ["masa", "volumen", "densidad"], "correcta": 0 }
      ]
    },
    {
      "texto": "El punto de partida de todo cálculo estequiométrico es la ecuación química ___.",
      "huecos": [
        { "opciones": ["balanceada", "ionizada", "disociada"], "correcta": 0 }
      ]
    },
    {
      "texto": "El reactivo ___ se consume por completo primero y determina la máxima cantidad de producto posible.",
      "huecos": [
        { "opciones": ["catalizador", "limitante", "en exceso"], "correcta": 1 }
      ]
    },
    {
      "texto": "En condiciones normales (0 °C y 1 atm), un mol de cualquier gas ocupa ___ litros.",
      "huecos": [
        { "opciones": ["6,02", "22,4", "24,4"], "correcta": 1 }
      ]
    }
  ]
}
);

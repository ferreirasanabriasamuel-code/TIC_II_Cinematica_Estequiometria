/* ============================================================
   Datos del juego "Balancea la ecuación" (Estequiometría)
   ------------------------------------------------------------
   Edite este archivo para cambiar las ecuaciones y sus
   coeficientes. El motor (js/motor-juegos.js) hace el resto.

   Formato del tipo "completar":
     frases: [ { texto: '___ H₂ + ___ O₂ → ___ H₂O', huecos: [ { opciones: ['1','2','3'], correcta: 0 } ] } ]
   (cada '___' es el coeficiente que sigue: se elige entre las opciones)

   Todas las ecuaciones son balances clásicos de libro:
     2 H₂ + O₂ → 2 H₂O          H₂ + Cl₂ → 2 HCl
     CH₄ + 2 O₂ → CO₂ + 2 H₂O   2 Na + Cl₂ → 2 NaCl
     2 H₂O₂ → 2 H₂O + O₂
   ============================================================ */

MotorJuegos.iniciar(
{
  "tipo": "completar",
  "frases": [
    {
      "texto": "___ H₂ + ___ O₂ → ___ H₂O",
      "huecos": [
        { "opciones": ["1", "2", "3"], "correcta": 1 },
        { "opciones": ["1", "2", "3"], "correcta": 0 },
        { "opciones": ["1", "2", "3"], "correcta": 1 }
      ]
    },
    {
      "texto": "___ H₂ + ___ Cl₂ → ___ HCl",
      "huecos": [
        { "opciones": ["1", "2", "3"], "correcta": 0 },
        { "opciones": ["1", "2", "3"], "correcta": 0 },
        { "opciones": ["1", "2", "3"], "correcta": 1 }
      ]
    },
    {
      "texto": "___ CH₄ + ___ O₂ → ___ CO₂ + ___ H₂O",
      "huecos": [
        { "opciones": ["1", "2", "3"], "correcta": 0 },
        { "opciones": ["1", "2", "3"], "correcta": 1 },
        { "opciones": ["1", "2", "3"], "correcta": 0 },
        { "opciones": ["1", "2", "3"], "correcta": 1 }
      ]
    },
    {
      "texto": "___ Na + ___ Cl₂ → ___ NaCl",
      "huecos": [
        { "opciones": ["1", "2", "3"], "correcta": 1 },
        { "opciones": ["1", "2", "3"], "correcta": 0 },
        { "opciones": ["1", "2", "3"], "correcta": 1 }
      ]
    },
    {
      "texto": "___ H₂O₂ → ___ H₂O + ___ O₂",
      "huecos": [
        { "opciones": ["1", "2", "3"], "correcta": 1 },
        { "opciones": ["1", "2", "3"], "correcta": 1 },
        { "opciones": ["1", "2", "3"], "correcta": 0 }
      ]
    }
  ]
}
);

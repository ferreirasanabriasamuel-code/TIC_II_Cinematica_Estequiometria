/* ============================================================
   Datos del juego "Clasifica la sustancia" (Estequiometría)
   ------------------------------------------------------------
   Edite este archivo para cambiar las categorías o los items.
   El motor (js/motor-juegos.js) hace el resto.

   Formato del tipo "clasificar":
     categorias: [ 'Elemento', 'Compuesto', ... ]
     items: [ { texto: '…', categoria: 0 } ]
   ============================================================ */

MotorJuegos.iniciar(
{
  "tipo": "clasificar",
  "categorias": ["Elemento", "Compuesto", "Mezcla"],
  "items": [
    {
      "texto": "H₂O (agua pura)",
      "categoria": 1
    },
    {
      "texto": "O₂ (oxígeno gaseoso)",
      "categoria": 0
    },
    {
      "texto": "Aire",
      "categoria": 2
    },
    {
      "texto": "NaCl (cloruro de sodio)",
      "categoria": 1
    },
    {
      "texto": "Fe (hierro)",
      "categoria": 0
    },
    {
      "texto": "Agua de mar",
      "categoria": 2
    }
  ]
}
);

/* ============================================================
   Datos del juego "Completa la definición" (Cinemática)
   ------------------------------------------------------------
   Edite este archivo para cambiar las frases y sus opciones.
   El motor (js/motor-juegos.js) hace el resto.

   Formato del tipo "completar":
     frases: [ { texto: '… ___ …', huecos: [ { opciones: [ ... ], correcta: 0 } ] } ]
   (cada '___' del texto se reemplaza por un hueco que recorre sus opciones)
   ============================================================ */

MotorJuegos.iniciar(
{
  "tipo": "completar",
  "frases": [
    {
      "texto": "La ___ es la rama de la mecánica que describe el movimiento, sin estudiar las fuerzas que lo provocan.",
      "huecos": [
        { "opciones": ["dinámica", "cinemática", "estática"], "correcta": 1 }
      ]
    },
    {
      "texto": "El ___ es el vector que va del punto inicial al punto final del movimiento.",
      "huecos": [
        { "opciones": ["desplazamiento", "kilómetro", "trayectoria"], "correcta": 0 }
      ]
    },
    {
      "texto": "En el MRU la velocidad es constante y la aceleración es ___.",
      "huecos": [
        { "opciones": ["nula", "creciente", "igual a g"], "correcta": 0 }
      ]
    },
    {
      "texto": "En una gráfica posición–tiempo, la ___ de la curva representa la velocidad.",
      "huecos": [
        { "opciones": ["área", "altura", "pendiente"], "correcta": 2 }
      ]
    },
    {
      "texto": "Despreciando la resistencia del aire, todos los cuerpos caen con la misma aceleración: g ≈ ___ m/s².",
      "huecos": [
        { "opciones": ["9,8", "8,9", "98"], "correcta": 0 }
      ]
    }
  ]
}
);

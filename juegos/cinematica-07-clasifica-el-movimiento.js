/* ============================================================
   Datos del juego "Clasifica el movimiento" (Cinemática)
   ------------------------------------------------------------
   Edite este archivo para cambiar las categorías o los items.
   El motor (js/motor-juegos.js) hace el resto.

   Formato del tipo "clasificar":
     categorias: [ 'MRU', 'MRUA', ... ]
     items: [ { texto: '…', categoria: 0 } ]
   ============================================================ */

MotorJuegos.iniciar(
{
  "tipo": "clasificar",
  "categorias": ["MRU", "MRUA", "Caída libre"],
  "items": [
    {
      "texto": "Un auto viaja por una ruta recta a 90 km/h, siempre igual.",
      "categoria": 0
    },
    {
      "texto": "Un móvil parte del reposo y aumenta su velocidad 2 m/s en cada segundo.",
      "categoria": 1
    },
    {
      "texto": "Una pelota se suelta desde un balcón y la resistencia del aire se desprecia.",
      "categoria": 2
    },
    {
      "texto": "Recorre distancias iguales en tiempos iguales.",
      "categoria": 0
    },
    {
      "texto": "Su velocidad varía en cantidades iguales en tiempos iguales.",
      "categoria": 1
    },
    {
      "texto": "Es un MRUA particular, con aceleración g dirigida hacia abajo.",
      "categoria": 2
    }
  ]
}
);

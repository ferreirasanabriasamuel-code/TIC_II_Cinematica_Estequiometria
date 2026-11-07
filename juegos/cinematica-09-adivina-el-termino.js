/* ============================================================
   Datos del juego "Adivina el término" (Cinemática)
   ------------------------------------------------------------
   Edite este archivo para cambiar las palabras y sus pistas.
   El motor (js/motor-juegos.js) hace el resto.

   Formato del tipo "adivina":
     palabras: [ { palabra: 'RAPIDEZ', pista: '…' } ]
   (las palabras van en mayúsculas, sin Ñ ni acentos)
   ============================================================ */

MotorJuegos.iniciar(
{
  "tipo": "adivina",
  "palabras": [
    {
      "palabra": "RAPIDEZ",
      "pista": "Magnitud escalar que mide qué tan rápido se mueve un cuerpo."
    },
    {
      "palabra": "TRAYECTORIA",
      "pista": "La línea que dibuja el recorrido de un móvil."
    },
    {
      "palabra": "ACELERACION",
      "pista": "Magnitud que mide qué tan rápido cambia la velocidad con el tiempo."
    },
    {
      "palabra": "GRAVEDAD",
      "pista": "La aceleración con la que caen los cuerpos cerca de la superficie terrestre."
    },
    {
      "palabra": "MOVIMIENTO",
      "pista": "El cambio de posición de un cuerpo a lo largo del tiempo."
    }
  ]
}
);

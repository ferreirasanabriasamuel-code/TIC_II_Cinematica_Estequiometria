/* ============================================================
   Datos del juego "Cálculos al instante" (Cinemática)
   ------------------------------------------------------------
   Edite este archivo para cambiar los cálculos y sus opciones.
   El motor (js/motor-juegos.js) hace el resto.

   Formato del tipo "quiz":
     preguntas: [ { texto, opciones[], correcta, explicacion } ]
   ============================================================ */

MotorJuegos.iniciar(
{
  "tipo": "quiz",
  "preguntas": [
    {
      "texto": "Un auto recorre 150 km en 2 horas. Su rapidez media es…",
      "opciones": [
        "75 km/h",
        "300 km/h",
        "50 km/h",
        "152 km/h"
      ],
      "correcta": 0,
      "explicacion": "v = Δx / Δt = 150 km ÷ 2 h = 75 km/h."
    },
    {
      "texto": "Con rapidez constante de 25 m/s durante 4 s, un móvil recorre…",
      "opciones": [
        "100 m",
        "29 m",
        "6,25 m",
        "125 m"
      ],
      "correcta": 0,
      "explicacion": "Es un MRU: Δx = v · t = 25 m/s · 4 s = 100 m."
    },
    {
      "texto": "Partiendo del reposo con a = 2 m/s², a los 5 s la velocidad es…",
      "opciones": [
        "10 m/s",
        "2,5 m/s",
        "25 m/s",
        "7 m/s"
      ],
      "correcta": 0,
      "explicacion": "v = v0 + a · t = 0 + 2 m/s² · 5 s = 10 m/s."
    },
    {
      "texto": "En un MRU con x0 = 0 y v = 10 m/s, la posición a los 8 s es…",
      "opciones": [
        "80 m",
        "18 m",
        "1,25 m",
        "800 m"
      ],
      "correcta": 0,
      "explicacion": "x = x0 + v · t = 0 + 10 m/s · 8 s = 80 m."
    },
    {
      "texto": "Un ciclista pasa de 4 m/s a 10 m/s en 3 s. Su aceleración media es…",
      "opciones": [
        "2 m/s²",
        "6 m/s²",
        "14 m/s²",
        "1,5 m/s²"
      ],
      "correcta": 0,
      "explicacion": "a = Δv / Δt = (10 − 4) m/s ÷ 3 s = 2 m/s²."
    }
  ]
}
);

/* ============================================================
   Datos del juego "Ordena el análisis" (Cinemática)
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
  "tipo": "ordenar",
  "pasos": [
    "Leer el problema y anotar los datos conocidos y la incógnita.",
    "Elegir el sistema de referencia y el sentido positivo.",
    "Identificar el tipo de movimiento (MRU o MRUA).",
    "Elegir la ecuación o ecuaciones que conectan los datos con la incógnita.",
    "Resolver numéricamente cuidando las unidades.",
    "Comprobar que el resultado tenga sentido físico (signo, magnitud y unidades)."
  ]
}
);

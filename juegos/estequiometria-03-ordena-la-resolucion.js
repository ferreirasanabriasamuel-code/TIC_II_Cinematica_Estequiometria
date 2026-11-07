/* ============================================================
   Datos del juego "Ordena la resolución" (Estequiometría)
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
    "Escribir la ecuación química de la reacción.",
    "Balancear la ecuación química.",
    "Convertir los datos de masa a moles (masa ÷ masa molar).",
    "Relacionar reactivos y productos usando los coeficientes estequiométricos.",
    "Calcular los moles de la sustancia pedida.",
    "Convertir el resultado a las unidades pedidas y comprobar el cálculo."
  ]
}
);

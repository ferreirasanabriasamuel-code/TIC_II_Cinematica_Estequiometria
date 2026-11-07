/* ============================================================
   Datos del juego "Adivina el término" (Estequiometría)
   ------------------------------------------------------------
   Edite este archivo para cambiar las palabras y sus pistas.
   El motor (js/motor-juegos.js) hace el resto.

   Formato del tipo "adivina":
     palabras: [ { palabra: 'MOLECULA', pista: '…' } ]
   (las palabras van en mayúsculas, sin Ñ ni acentos)
   ============================================================ */

MotorJuegos.iniciar(
{
  "tipo": "adivina",
  "palabras": [
    {
      "palabra": "MOLECULA",
      "pista": "Unión de átomos; la unidad mínima de muchas sustancias, como el agua."
    },
    {
      "palabra": "AVOGADRO",
      "pista": "Su número (6,022 × 10²³) dice cuántas entidades hay en un mol."
    },
    {
      "palabra": "REACTIVO",
      "pista": "Sustancia que participa al comienzo de una reacción química."
    },
    {
      "palabra": "PRODUCTO",
      "pista": "Sustancia que se forma como resultado de una reacción química."
    },
    {
      "palabra": "BALANCEO",
      "pista": "Ajuste de los coeficientes de una ecuación para respetar la conservación de la masa."
    }
  ]
}
);

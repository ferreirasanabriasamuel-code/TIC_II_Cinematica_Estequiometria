/* ============================================================
   Datos del juego "Empareja los conceptos" (Estequiometría)
   ------------------------------------------------------------
   Edite este archivo para cambiar los pares.
   El motor (js/motor-juegos.js) hace el resto.

   Formato del tipo "emparejar":
     parejas: [ { a: 'Fórmula', b: 'Para qué sirve' } ]
   ============================================================ */

MotorJuegos.iniciar(
{
  "tipo": "emparejar",
  "parejas": [
    {
      "a": "n = m / M",
      "b": "Convertir una masa en moles"
    },
    {
      "a": "n = N / 6,022 × 10²³",
      "b": "Convertir un número de partículas en moles"
    },
    {
      "a": "V = n · 22,4 L/mol",
      "b": "Calcular el volumen de un gas en CNPT"
    },
    {
      "a": "rendimiento (%) = (masa real / masa teórica) · 100",
      "b": "Comparar lo obtenido con lo teórico"
    },
    {
      "a": "Número de Avogadro",
      "b": "6,022 × 10²³ entidades por mol"
    },
    {
      "a": "Conservación de la masa",
      "b": "Ley de Lavoisier detrás de todo balanceo"
    }
  ]
}
);

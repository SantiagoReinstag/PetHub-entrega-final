const db = require('../db');

const actualizarCitasPasadas = async () => {
  try {
    const ahora = new Date();

    const resultado = await db('citas')
      .where('fecha_cita', '<', ahora)
      .andWhere('activo', true)
      .update({ activo: false });

    console.log(`[CRON] Citas vencidas desactivadas: ${resultado}`);
  } catch (err) {
    console.error('[CRON] Error al actualizar citas vencidas:', err);
  }
};

module.exports = actualizarCitasPasadas;

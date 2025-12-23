const db = require("../config/db");

const getLatestPerAlat = async () => {
  const [rows] = await db.query(`
    SELECT t.*
    FROM tb_suhu_kelembapan_ruang_baru_dummy t
    JOIN (
      SELECT 
        id_alat_monitor_suhu_kelembapan,
        MAX(created_at) AS latest_time
      FROM tb_suhu_kelembapan_ruang_baru_dummy
      GROUP BY id_alat_monitor_suhu_kelembapan
    ) latest
      ON t.id_alat_monitor_suhu_kelembapan = latest.id_alat_monitor_suhu_kelembapan
     AND t.created_at = latest.latest_time
    ORDER BY t.id_ruangan_gedung
  `);

  return rows;
};

module.exports = { getLatestPerAlat };

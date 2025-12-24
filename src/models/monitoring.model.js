const db = require("../config/db");

const getLatestPerAlat = async () => {
  const [rows] = await db.query(`
  SELECT
  a.kode_alat,
  a.status_alat,
  a.id_ruangan_gedung,
  a.waktu_pengambilan_data,

  r.nama_ruangan,
  r.maksimal_suhu,
  r.maksimal_kelembaban,

  h.suhu,
  h.kelembapan,
  h.cahaya,
  h.created_at AS history_created_at

FROM tb_alat_monitor_suhu_kelembapan a

JOIN tb_ruangan_gedung r
  ON r.id = a.id_ruangan_gedung

LEFT JOIN (
  SELECT h1.*
  FROM tb_suhu_kelembapan_ruang_baru_dummy h1
  JOIN (
    SELECT kode_alat, MAX(created_at) AS max_created
    FROM tb_suhu_kelembapan_ruang_baru_dummy
    GROUP BY kode_alat
  ) h2
    ON h1.kode_alat = h2.kode_alat
   AND h1.created_at = h2.max_created
) h
  ON h.kode_alat = a.kode_alat

ORDER BY r.id, a.kode_alat;

  `);

  return rows;
};

module.exports = { getLatestPerAlat };

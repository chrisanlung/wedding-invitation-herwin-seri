/* =========================================================================
   Penerima RSVP undangan Herwin & Seri -> Google Sheets.

   Cara pasang (sekali saja, lihat juga README bagian "RSVP ke Google Sheets"):
     1. Buat Google Sheet baru.
     2. Extensions -> Apps Script. Hapus isi Code.gs bawaan, tempel SELURUH
        berkas ini, lalu Save.
     3. Deploy -> New deployment -> jenis "Web app".
          Execute as : Me
          Who has access : Anyone
        Deploy, izinkan aksesnya, lalu salin "Web app URL" (berakhiran /exec).
     4. Taruh URL itu di NEXT_PUBLIC_RSVP_ENDPOINT (berkas .env.local untuk
        lokal, dan Environment Variables di Vercel untuk produksi).

   Kalau berkas ini diubah, perubahannya baru berlaku setelah
   Deploy -> Manage deployments -> edit (ikon pensil) -> Version: New version.
   URL-nya tetap sama.

   Dua pintu:
     doPost  - menambah satu baris RSVP ke sheet "RSVP".
     doGet   - mengembalikan ucapan terbaru (yang tidak kosong) sebagai JSON,
               dipakai section Ucapan & Doa supaya semua tamu melihat ucapan
               yang sama.
   ========================================================================= */

var NAMA_SHEET = "RSVP";
var KOLOM = ["Waktu", "Nama", "Kehadiran", "Jumlah Tamu", "Ucapan & Doa"];
var BATAS_UCAPAN = 50;

var LABEL_HADIR = {
  hadir: "Hadir",
  ragu: "Belum pasti",
  tidak: "Tidak hadir",
};

function ambilSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(NAMA_SHEET);
  if (!sh) {
    sh = ss.insertSheet(NAMA_SHEET);
    sh.appendRow(KOLOM);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, KOLOM.length).setFontWeight("bold");
  }
  return sh;
}

/* Isian tamu ditulis apa adanya ke sel. Teks yang diawali = + - @ akan
   dibaca Sheets sebagai RUMUS - jadi diberi awalan petik supaya tetap teks
   biasa. Panjangnya juga dipotong, sama dengan batas di formulir. */
function bersihkan_(nilai, maks) {
  var s = String(nilai == null ? "" : nilai).trim().slice(0, maks);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doPost(e) {
  var data;
  try {
    data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
  } catch (err) {
    return json_({ ok: false, error: "Format kiriman tidak valid." });
  }

  var nama = bersihkan_(data.nama, 60);
  if (!nama) return json_({ ok: false, error: "Nama wajib diisi." });

  var hadir = LABEL_HADIR[data.hadir] ? data.hadir : "hadir";
  var jumlah = hadir === "tidak" ? 0 : Math.min(Math.max(parseInt(data.jumlah, 10) || 1, 1), 10);
  var pesan = bersihkan_(data.pesan, 400);

  // Kunci: dua tamu yang mengirim di detik yang sama tidak saling menimpa.
  var kunci = LockService.getScriptLock();
  kunci.waitLock(10000);
  try {
    ambilSheet_().appendRow([new Date(), nama, LABEL_HADIR[hadir], jumlah, pesan]);
  } finally {
    kunci.releaseLock();
  }

  return json_({ ok: true });
}

function doGet() {
  var sh = ambilSheet_();
  var baris = sh.getLastRow() - 1; // tanpa judul kolom
  if (baris <= 0) return json_({ ok: true, ucapan: [] });

  var nilai = sh.getRange(2, 1, baris, KOLOM.length).getValues();
  var ucapan = [];
  // Dari bawah = terbaru dulu.
  for (var i = nilai.length - 1; i >= 0 && ucapan.length < BATAS_UCAPAN; i--) {
    var nama = String(nilai[i][1] || "").replace(/^'/, "");
    var pesan = String(nilai[i][4] || "").replace(/^'/, "");
    if (nama && pesan) ucapan.push({ name: nama, message: pesan });
  }
  return json_({ ok: true, ucapan: ucapan });
}

/* =========================================================================
   Jembatan ke Google Sheets (lewat Google Apps Script, lihat
   google-apps-script/Code.gs dan README bagian "RSVP ke Google Sheets").

   Alamatnya dari NEXT_PUBLIC_RSVP_ENDPOINT. Kalau kosong, RSVP_AKTIF = false
   dan undangan kembali ke perilaku lama: ucapan hanya disimpan di
   localStorage peramban tamu itu sendiri.

   Kenapa Content-Type text/plain, bukan application/json: Apps Script tidak
   menjawab permintaan preflight CORS (OPTIONS). Dengan text/plain, POST-nya
   termasuk "simple request" sehingga peramban tidak mengirim preflight.
   Isinya tetap JSON - Code.gs mem-parse-nya sendiri.
   ========================================================================= */

export const RSVP_ENDPOINT = process.env.NEXT_PUBLIC_RSVP_ENDPOINT || "";
export const RSVP_AKTIF = Boolean(RSVP_ENDPOINT);

export async function kirimRsvp({ nama, hadir, jumlah, pesan }) {
  const res = await fetch(RSVP_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ nama, hadir, jumlah, pesan }),
  });
  const hasil = await res.json().catch(() => null);
  if (!res.ok || !hasil || !hasil.ok) {
    throw new Error((hasil && hasil.error) || "Gagal mengirim.");
  }
  return hasil;
}

export async function ambilUcapan() {
  const res = await fetch(RSVP_ENDPOINT, { method: "GET" });
  const hasil = await res.json();
  if (!hasil || !hasil.ok || !Array.isArray(hasil.ucapan)) throw new Error("Respons tidak valid.");
  return hasil.ucapan;
}

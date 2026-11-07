"use client";

/* =========================================================================
   Formulir konfirmasi kehadiran.

   Kalau NEXT_PUBLIC_RSVP_ENDPOINT diisi, tiap kiriman menjadi satu baris
   baru di Google Sheets (lihat lib/rsvpApi.js dan google-apps-script/).
   Kalau kosong, isiannya TIDAK terkirim ke mana pun - ucapannya hanya
   disimpan di localStorage peramban tamu itu sendiri.
   ========================================================================= */

import { useEffect, useState } from "react";
import { useGuestName } from "@/lib/hooks";
import { useWishes } from "@/lib/WishesProvider";
import { RSVP_AKTIF, kirimRsvp } from "@/lib/rsvpApi";

export default function Rsvp() {
  const { tambah } = useWishes();
  const namaTamu = useGuestName();

  const [nama, setNama] = useState("");
  const [hadir, setHadir] = useState("hadir");
  const [jumlah, setJumlah] = useState("1");
  const [pesan, setPesan] = useState("");
  const [catatan, setCatatan] = useState({ teks: "", salah: false });
  const [mengirim, setMengirim] = useState(false);

  // Nama dari ?to= dipakai sebagai isian awal - tapi jangan menimpa kalau
  // tamunya sudah terlanjur mengetik namanya sendiri.
  useEffect(() => {
    if (namaTamu) setNama((lama) => lama || namaTamu);
  }, [namaTamu]);

  async function kirim(ev) {
    ev.preventDefault();
    if (mengirim) return; // cegah kirim ganda saat jaringan lambat
    const bersih = nama.trim();

    if (!bersih) {
      setCatatan({ teks: "Mohon isi nama Anda terlebih dahulu.", salah: true });
      const el = document.getElementById("rsvpName");
      if (el) el.focus();
      return;
    }

    const isi = pesan.trim();

    if (RSVP_AKTIF) {
      setMengirim(true);
      setCatatan({ teks: "Mengirim…", salah: false });
      try {
        await kirimRsvp({ nama: bersih, hadir, jumlah: hadir === "tidak" ? "0" : jumlah, pesan: isi });
      } catch {
        // Isian TIDAK dikosongkan, supaya tamu cukup menekan Kirim lagi.
        setCatatan({ teks: "Maaf, konfirmasi gagal terkirim. Periksa koneksi lalu coba lagi.", salah: true });
        setMengirim(false);
        return;
      }
      setMengirim(false);
    }

    if (isi) tambah({ name: bersih, message: isi });

    setCatatan({ teks: "Terima kasih, konfirmasi Anda sudah kami terima.", salah: false });
    setNama("");
    setHadir("hadir");
    setJumlah("1");
    setPesan("");
  }

  return (
    <section className="screen screen--alt screen--gold" data-screen-label="RSVP">
      <div data-px>
        <div className="head">
          <p className="eyebrow">Konfirmasi kehadiran</p>
          <h2 className="title">RSVP</h2>
          <p className="lead">
            Mohon konfirmasi sebelum 2 Januari 2027 agar kami dapat menyambut Anda dengan baik.
          </p>
        </div>

        <form className="form" onSubmit={kirim} noValidate>
          <div className="field">
            <label className="field__label" htmlFor="rsvpName">
              Nama Anda
            </label>
            <input
              className="input"
              type="text"
              id="rsvpName"
              name="name"
              placeholder="Nama Anda"
              autoComplete="name"
              maxLength={60}
              required
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>

          <div className="field">
            <label className="field__label" htmlFor="rsvpAttend">
              Kehadiran
            </label>
            <select
              className="input"
              id="rsvpAttend"
              name="attend"
              value={hadir}
              onChange={(e) => setHadir(e.target.value)}
            >
              <option value="hadir">Ya, saya akan hadir</option>
              <option value="ragu">Masih belum pasti</option>
              <option value="tidak">Maaf, belum bisa hadir</option>
            </select>
          </div>

          {/* Jumlah tamu hanya relevan kalau berencana hadir. */}
          <div className="field" hidden={hadir === "tidak"}>
            <label className="field__label" htmlFor="rsvpGuests">
              Jumlah tamu
            </label>
            <select
              className="input"
              id="rsvpGuests"
              name="guests"
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
            >
              <option value="1">1 orang</option>
              <option value="2">2 orang</option>
              <option value="3">3 orang</option>
              <option value="4">4 orang</option>
            </select>
          </div>

          <div className="field">
            <label className="field__label" htmlFor="rsvpMessage">
              Ucapan &amp; doa
            </label>
            <textarea
              className="input input--area"
              id="rsvpMessage"
              name="message"
              rows={4}
              placeholder="Ucapan &amp; doa untuk kami"
              maxLength={400}
              value={pesan}
              onChange={(e) => setPesan(e.target.value)}
            />
          </div>

          <button className="btn btn--solid btn--block" type="submit" disabled={mengirim}>
            {mengirim ? "Mengirim…" : "Kirim"}
          </button>
          <p className={`form__note${catatan.salah ? " form__note--error" : ""}`} role="status" aria-live="polite">
            {catatan.teks}
          </p>
        </form>
      </div>
    </section>
  );
}

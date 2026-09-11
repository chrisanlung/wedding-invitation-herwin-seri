"use client";

/* =========================================================================
   Formulir konfirmasi kehadiran.

   PENTING: isian ini TIDAK terkirim ke mana pun. Ucapannya disimpan di
   localStorage peramban tamu itu sendiri, jadi mempelai tidak menerimanya.
   Untuk mengumpulkan RSVP sungguhan, sambungkan `kirim()` di bawah ke
   layanan luar (Google Form, Formspree, atau API sendiri).
   ========================================================================= */

import { useEffect, useState } from "react";
import { useGuestName } from "@/lib/hooks";
import { useWishes } from "@/lib/WishesProvider";

export default function Rsvp() {
  const { tambah } = useWishes();
  const namaTamu = useGuestName();

  const [nama, setNama] = useState("");
  const [hadir, setHadir] = useState("hadir");
  const [jumlah, setJumlah] = useState("1");
  const [pesan, setPesan] = useState("");
  const [catatan, setCatatan] = useState({ teks: "", salah: false });

  // Nama dari ?to= dipakai sebagai isian awal - tapi jangan menimpa kalau
  // tamunya sudah terlanjur mengetik namanya sendiri.
  useEffect(() => {
    if (namaTamu) setNama((lama) => lama || namaTamu);
  }, [namaTamu]);

  function kirim(ev) {
    ev.preventDefault();
    const bersih = nama.trim();

    if (!bersih) {
      setCatatan({ teks: "Mohon isi nama Anda terlebih dahulu.", salah: true });
      const el = document.getElementById("rsvpName");
      if (el) el.focus();
      return;
    }

    const isi = pesan.trim();
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

          <button className="btn btn--solid btn--block" type="submit">
            Kirim
          </button>
          <p className={`form__note${catatan.salah ? " form__note--error" : ""}`} role="status" aria-live="polite">
            {catatan.teks}
          </p>
        </form>
      </div>
    </section>
  );
}

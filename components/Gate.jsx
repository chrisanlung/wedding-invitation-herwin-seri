"use client";

/* =========================================================================
   Halaman pembuka: menutupi seluruh layar sampai "Buka Undangan" ditekan.

   Tiga hal terjadi dalam satu tekanan, dan urutannya penting:
     1. musik diputar - harus DI DALAM gestur tap, kalau tidak diblokir
        aturan autoplay peramban;
     2. kunci gulir dilepas dari <html> dan <body>;
     3. halaman pembukanya memudar lalu benar-benar dilepas dari tata letak.
   ========================================================================= */

import { useEffect, useState } from "react";
import { useAudio } from "@/lib/AudioProvider";
import { useGuestName } from "@/lib/hooks";
import Doves from "./Doves";
import { MEMPELAI, TANGGAL } from "@/lib/data";

export default function Gate() {
  const { play } = useAudio();
  const namaTamu = useGuestName();
  const [menutup, setMenutup] = useState(false);
  const [hilang, setHilang] = useState(false);

  // Kalau JavaScript hidup tapi komponen ini gagal terpasang, kunci gulirnya
  // akan tertinggal selamanya. Karena itu pelepasannya diikat ke state, bukan
  // ditulis sekali di dalam penangan klik.
  useEffect(() => {
    if (!menutup) return;
    document.documentElement.classList.remove("is-locked");
    document.body.classList.remove("is-locked");
    window.scrollTo(0, 0);

    const t = window.setTimeout(() => {
      setHilang(true);
      // segarkan fallback paralaks: tinggi halaman berubah drastis
      window.dispatchEvent(new Event("resize"));
    }, 760);
    return () => window.clearTimeout(t);
  }, [menutup]);

  function buka() {
    if (menutup) return; // cegah klik ganda
    play();
    setMenutup(true);
  }

  return (
    <div className={`gate${menutup ? " is-closing" : ""}`} id="gate" hidden={hilang}>
      {/* Latar halaman pembuka = foto (lihat .gate di globals.css). Merpatinya
          tetap di belakang .gate__inner yang ber-z-index 1, jadi tak pernah
          menutupi nama mempelai maupun tombolnya. */}
      <Doves />

      <div className="gate__inner">
        {/* Monogram H&S. alt kosong + aria-hidden: ini pengulangan visual dari
            nama yang tertulis tepat di bawahnya, jadi membacanya lagi hanya
            menambah kebisingan bagi pembaca layar.
            logo-hs-01.webp dibuat dari logo-hs-01.png (hitam di atas putih,
            tanpa transparansi): tintanya dijadikan alpha dan diwarnai emas
            --accent, supaya bisa duduk di atas foto latar. */}
        <img
          className="gate__logo"
          src="/assets/img/logo-hs-01.webp"
          alt=""
          aria-hidden="true"
          width="480"
          height="480"
        />

        <p className="eyebrow">Undangan Pernikahan</p>
        <h1 className="gate__names">
          {MEMPELAI.pria.panggilan}
          <span className="amp">&amp;</span>
          {MEMPELAI.wanita.panggilan}
        </h1>
        <p className="gate__date">{TANGGAL}</p>

        {/* Muncul hanya kalau alamatnya memakai ?to=Nama+Tamu */}
        <div className="gate__to" id="gateTo" hidden={!namaTamu}>
          <p className="gate__toLabel">Kepada Yth.</p>
          <p className="gate__toName">{namaTamu}</p>
        </div>

        <button type="button" className="btn btn--solid gate__btn" id="openBtn" onClick={buka} disabled={menutup}>
          Buka Undangan
        </button>
      </div>
    </div>
  );
}

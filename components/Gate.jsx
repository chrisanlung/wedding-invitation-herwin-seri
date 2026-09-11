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
      {/* Hiasan taman: pohon sakura kiri-kanan, hamparan bunga, lalu semak. */}
      <div className="gate__deco" aria-hidden="true">
        <img className="deco deco--tree deco--tree-l" src="/assets/img/deco/tree-sakura.webp" alt="" width="380" height="404" />
        <img className="deco deco--tree deco--tree-r" src="/assets/img/deco/tree-sakura.webp" alt="" width="380" height="404" />

        <div className="deco deco--bed"></div>

        <img className="deco deco--bush deco--bush-l" src="/assets/img/deco/bush.webp" alt="" width="560" height="133" />
        <img className="deco deco--bush deco--bush-r" src="/assets/img/deco/bush.webp" alt="" width="560" height="133" />
      </div>

      <div className="gate__inner">
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

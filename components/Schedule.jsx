/* Susunan acara berbentuk garis waktu berkelok: gambar dan keterangan
   berselang kiri-kanan, dipisah garis tegak di tengah, dengan medali lilin
   di tiap acara dan kilau kecil di antaranya.

   Bagian ini tetap wajib muat satu layar seperti bagian lain undangan, jadi
   tinggi gambarnya DIPATOK lewat CSS alih-alih mengikuti lebar kolom. Itu
   yang membuat tinggi tiap baris bisa dihitung sejak awal.

   Medali dan kilaunya digambar sebagai SVG, bukan berkas gambar: tidak ada
   permintaan jaringan tambahan, tetap tajam di layar mana pun, dan warnanya
   memakai emas yang sama dengan hiasan lain (--gold). */

import { ACARA, TANGGAL } from "@/lib/data";

/* Gradasi medali ditulis SEKALI di sini lalu dipakai ulang oleh tiap medali
   lewat url(#seal-gold). Kalau <defs> ditulis di dalam tiap medali, id-nya
   jadi kembar - tidak sah, dan peramban hanya memakai yang pertama. */
function SealDefs() {
  return (
    <svg className="svg-defs" aria-hidden="true" focusable="false" width="0" height="0">
      <defs>
        <radialGradient id="seal-gold" cx="34%" cy="28%" r="78%">
          <stop offset="0" stopColor="#EBC786" />
          <stop offset=".52" stopColor="#C18E41" />
          <stop offset="1" stopColor="#8E6427" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* Tepi bergelombang lilinnya dibuat dari garis putus-putus berujung bulat,
   bukan path berlekuk yang ditulis tangan: tiap potongan pendek dengan
   linecap bulat muncul sebagai satu tonjolan di keliling lingkaran, jadi
   rimbunnya merata dengan sendirinya. */
function Seal() {
  return (
    <svg className="agenda__seal" viewBox="0 0 56 56" aria-hidden="true" focusable="false">
      <circle
        cx="28"
        cy="28"
        r="21"
        fill="url(#seal-gold)"
        stroke="url(#seal-gold)"
        strokeWidth="7"
        strokeDasharray="0.5 5.5"
        strokeLinecap="round"
      />
      <circle cx="28" cy="28" r="16.5" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth="1.1" />
      {/* dua cincin bertaut */}
      <g fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.6">
        <circle cx="24.6" cy="29" r="5.4" />
        <circle cx="31.4" cy="29" r="5.4" />
      </g>
    </svg>
  );
}

function Spark() {
  return (
    <svg className="agenda__spark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 0c.8 7 5 11.2 12 12-7 .8-11.2 5-12 12-.8-7-5-11.2-12-12C7 11.2 11.2 7 12 0Z" />
    </svg>
  );
}

export default function Schedule() {
  return (
    <section className="screen screen--alt screen--gold" data-screen-label="Susunan Acara">
      <div data-px>
        <div className="head">
          <p className="eyebrow">{TANGGAL}</p>
          <h2 className="title">Susunan Acara</h2>
        </div>

        <SealDefs />

        <ol className="agenda">
          {ACARA.map((a) => (
            <li className="agenda__row" key={a.tag}>
              <figure className="agenda__media">
                <img
                  src={a.gambar}
                  alt={a.gambarAlt}
                  width={a.gambarW}
                  height={a.gambarH}
                  loading="lazy"
                />
              </figure>

              {/* Kolom tengah: kilau di puncaknya, garis tegaknya digambar
                  CSS sebagai ::after supaya menyambung melewati jarak antar
                  baris. */}
              <div className="agenda__node" aria-hidden="true">
                <Spark />
              </div>

              <div className="agenda__text">
                <Seal />
                <p className="agenda__time">{a.jam} WIB</p>
                <h3 className="agenda__title">{a.tag}</h3>
                <p className="event__place">{a.tempat}</p>
                <p className="event__addr">{a.alamat}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

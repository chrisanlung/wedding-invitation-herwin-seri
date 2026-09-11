/* Kartu foto berjalan perlahan dari kanan ke kiri, berhenti saat disentuh.

   Satu set foto ditulis DUA KALI. Set kedua cuma salinan (aria-hidden, alt
   kosong) supaya pembaca layar tak membacanya dobel - dan supaya sambungan
   loop-nya tak terlihat: track-nya digeser tepat -50% = persis satu set.

   Jarak antar kartu memakai margin-kanan, BUKAN gap. Dengan gap, lebar
   track jadi 2n kartu + (2n-1) jarak, sehingga -50% meleset setengah jarak
   dan sambungannya tersentak tiap putaran. */

import { GALERI } from "@/lib/data";

function Kartu({ foto, salinan }) {
  return (
    <figure className="gallery__item" aria-hidden={salinan ? "true" : undefined}>
      <div className="gallery__card">
        <span className="gallery__frame">
          <img src={foto.src} alt={salinan ? "" : foto.alt} width={foto.w} height={foto.h} loading="lazy" />
        </span>
      </div>
    </figure>
  );
}

export default function Gallery() {
  return (
    <section className="screen screen--gallery screen--gold" data-screen-label="Galeri">
      <div data-px>
        <div className="head">
          <p className="eyebrow">Momen</p>
          <h2 className="title">Galeri</h2>
        </div>

        <div className="gallery" role="group" aria-label="Galeri foto">
          <div className="gallery__track">
            {GALERI.map((f) => (
              <Kartu foto={f} key={f.src} />
            ))}
            {GALERI.map((f) => (
              <Kartu foto={f} salinan key={`salinan-${f.src}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Kartu foto berjalan perlahan dari kanan ke kiri, berhenti saat disentuh.

   SET DIULANG LIMA KALI, bukan dua. Ini bukan pemborosan.

   Track digeser tepat satu set tiap putaran. Di akhir putaran, yang masih
   menutupi layar tinggal sisa track sesudah satu set terlewat - jadi dengan
   dua set, yang tersisa cuma SATU set. Satu set enam kartu lebarnya sekitar
   93rem, sementara lebar layar desktop sekitar 120rem (ukuran rem-nya sendiri
   diikat ke lebar layar, lihat aturan `html` di globals.css). Artinya satu
   set hanya menutupi ~77% layar dan 23% sisanya kosong - terukur 756px di
   monitor 2507px, 432px di 1920px. Itulah galeri yang "terpotong".

   Dengan lima set, yang tersisa di akhir putaran adalah EMPAT set = 372rem.
   Itu cukup selama lebar layar (dalam rem) di bawah 372. Di layar normal
   lebarnya 120rem, jadi lapang sekali. Yang perlu dijaga justru jendela
   yang lebar TAPI pendek: di situ ukuran rem-nya diikat ke tinggi layar
   (svh/60), sehingga lebar dalam rem = 60 x rasio jendela. Empat set aman
   sampai rasio ~6:1 - jauh di luar jendela yang dipakai orang.

   Empat set sempat dicoba dan lolos, tapi di jendela ultrawide pendek
   (3440x740) hanya menang 1px. Margin setipis itu bukan perbaikan.

   Di HP dua set sebenarnya sudah cukup (satu set 1109px jauh lebih lebar
   dari layar 390px), tapi jumlahnya disamakan supaya tak ada dua jalur
   perilaku yang harus diurus.

   Salinannya aria-hidden dengan alt kosong supaya pembaca layar tidak
   membaca foto yang sama lima kali. Berkasnya sama persis, jadi peramban
   hanya mengunduh sekali.

   Jarak antar kartu memakai margin-kanan, BUKAN gap. Dengan gap, lebar
   track jadi 5n kartu + (5n-1) jarak, sehingga geseran -20% meleset dan
   sambungannya tersentak tiap putaran. */

/* Berapa kali set diulang. HARUS sama dengan pembagi di @keyframes
   galleryRun: 5 set -> translateX(-20%). Kalau salah satu diubah tanpa yang
   lain, sambungan loop-nya melompat. */
const ULANGAN = 5;

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
            {Array.from({ length: ULANGAN }, (_, set) =>
              GALERI.map((f) => (
                <Kartu foto={f} salinan={set > 0} key={`${set}-${f.src}`} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

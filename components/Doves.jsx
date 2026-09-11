/* Merpati yang melintas di halaman pembuka.

   KEPAKANNYA CSS, BUKAN TIMER JS. Contoh aslinya menukar `img.src` setiap
   105ms lewat setInterval - delapan berkas terpisah, dan tiap pergantian
   memaksa peramban menukar sumber gambar. Di sini kedelapan frame digabung
   jadi satu strip mendatar, lalu strip itu DIGESER DENGAN transform di dalam
   jendela ber-overflow hidden.

   Kenapa transform dan bukan background-position: hanya transform dan
   opacity yang bisa dijalankan compositor tanpa melukis ulang. Versi pertama
   memakai background-position dan itu menimbulkan 196 operasi paint dalam
   lima detik; dengan transform, kepakan sama sekali tidak menyentuh tahap
   paint. Angkanya ada di catatan .dove__strip di globals.css.

   Merpatinya hanya dipasang di dalam <Gate>, jadi begitu undangan dibuka dan
   gerbangnya dilepas dari tata letak, animasinya ikut berhenti sendiri -
   tidak ada yang terus berjalan di belakang layar sepanjang undangan.

   Arah hadapnya penting: gambarnya menghadap KANAN. Karena itu merpati yang
   terbang ke kiri (yang ketiga) dicerminkan lewat CSS, dan jalur pulang tiap
   merpati sengaja ditempuh di luar layar - kalau tidak, ia terlihat terbang
   mundur.

   Murni hiasan: aria-hidden, dan pointer-events:none diatur di CSS. */

/* Ketiganya memakai src yang sama, jadi peramban mengunduh dan mendekode
   strip-nya sekali saja walau elemennya tiga. */
function Dove(sisi) {
  return (
    <span className={`dove dove--${sisi}`} key={sisi}>
      <span className="dove__win">
        <img
          className="dove__strip"
          src="/assets/img/dove-sprite.webp"
          alt=""
          width="2880"
          height="433"
          decoding="async"
        />
      </span>
    </span>
  );
}

export default function Doves() {
  return (
    <div className="doves" aria-hidden="true">
      {Dove("a")}
      {Dove("b")}
      {Dove("c")}
    </div>
  );
}

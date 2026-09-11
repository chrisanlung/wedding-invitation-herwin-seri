/* Dua cupid yang melayang ke sana ke mari mengelilingi undangan. Jalurnya
   murni CSS (cupidRoamA 42s / cupidRoamB 55s, bercermin satu sama lain).

   KEPAKANNYA 16 FRAME dari satu strip mendatar (cupid-sprite.webp,
   2880x176 = 16 x 180x176), digeser dengan transform di dalam jendela
   ber-overflow hidden - cara yang sama dengan merpati di halaman pembuka.
   Transform dipakai karena hanya transform dan opacity yang bisa dijalankan
   compositor tanpa melukis ulang tiap langkah.

   Strip-nya dibuat dari contact sheet 4x4 (cupid-frame.png): tiap sel
   dipotong di dalam garis pemisah putihnya, latar hitamnya dihapus, lalu
   keenambelasnya disusun memakai SATU kotak potong gabungan supaya kupidnya
   tidak bergeser antar frame.

   Gerak naik-turun terpisah (cupidBob) sudah tidak ada: keenambelas frame itu
   sendiri sudah membawa gerakannya, dan satu animasi lebih sedikit berarti
   satu properti lebih sedikit yang harus dievaluasi peramban tiap frame.

   Murni hiasan: aria-hidden + pointer-events:none di CSS, jadi tak
   mengganggu pembaca layar maupun sentuhan. */

/* Keduanya memakai src yang sama, jadi strip-nya diunduh dan didekode sekali. */
function Cupid(sisi) {
  return (
    <span className={`cupid cupid--${sisi}`} key={sisi} aria-hidden="true">
      <span className="cupid__win">
        <img
          className="cupid__strip"
          src="/assets/img/cupid-sprite.webp"
          alt=""
          width="2880"
          height="176"
          decoding="async"
        />
      </span>
    </span>
  );
}

export default function Cupids() {
  return (
    <>
      {Cupid("a")}
      {Cupid("b")}
    </>
  );
}

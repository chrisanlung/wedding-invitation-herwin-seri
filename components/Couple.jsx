/* Foto mempelai duduk DI BALIK bingkai bunga. Posisi dan ukuran lubang
   bingkainya diukur dari berkas bingkainya dan disimpan sebagai variabel
   --hole-* di CSS (.portrait--male / .portrait--female), jadi fotonya pas
   di dalam elips. Kalau ganti bingkai, ukur ulang lubangnya.

   Kedua bingkai TIDAK sama rasionya (male-2 900x1061, female 420x524), jadi
   aspect-ratio-nya juga dipasang per sisi di CSS - kalau dipukul rata,
   bingkainya ikut ketarik. Lebar sisi pria di desktop sengaja sedikit lebih
   besar supaya TINGGI kedua potret sama dan nama di bawahnya tetap sebaris. */

import { MEMPELAI } from "@/lib/data";

function Orang({ data, sisi, bingkai, bingkaiW, bingkaiH, judul }) {
  return (
    <div className="couple__person">
      <div className={`portrait portrait--${sisi}`}>
        <img
          className="portrait__photo"
          src={data.foto}
          alt={`Foto ${data.panggilan}`}
          width={data.fotoW}
          height={data.fotoH}
          loading="lazy"
        />
        <img
          className="portrait__frame"
          src={bingkai}
          alt=""
          aria-hidden="true"
          width={bingkaiW}
          height={bingkaiH}
          loading="lazy"
        />
      </div>
      <h2 className="couple__name">{data.nama}</h2>
      <p className="couple__parents">
        {judul}
        <br />
        {data.orangTua}
      </p>
    </div>
  );
}

export default function Couple() {
  return (
    <section className="screen screen--center screen--gold" data-screen-label="Mempelai">
      <div data-px>
        <p className="eyebrow">Dengan penuh syukur</p>
        <p className="lead">Kami mengundang Anda untuk menjadi bagian dari hari bahagia kami.</p>

        <div className="couple">
          <Orang
            data={MEMPELAI.pria}
            sisi="male"
            bingkai="/assets/img/deco/frame-male-2.webp"
            bingkaiW="900"
            bingkaiH="1061"
            judul="Putra dari"
          />

          <p className="couple__amp" aria-hidden="true">
            &amp;
          </p>

          <Orang
            data={MEMPELAI.wanita}
            sisi="female"
            bingkai="/assets/img/deco/frame-female.webp"
            bingkaiW="420"
            bingkaiH="524"
            judul="Putri dari"
          />
        </div>
      </div>
    </section>
  );
}

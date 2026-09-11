/* Foto mempelai duduk DI BALIK bingkai bunga. Posisi dan ukuran lubang
   bingkainya diukur dari berkas bingkainya dan disimpan sebagai variabel
   --hole-* di CSS (.portrait--male / .portrait--female), jadi fotonya pas
   di dalam elips. Kalau ganti bingkai, ukur ulang lubangnya. */

import { MEMPELAI } from "@/lib/data";

function Orang({ data, sisi, bingkai, bingkaiH, judul }) {
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
          width="420"
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
            bingkai="/assets/img/deco/frame-male.webp"
            bingkaiH="525"
            judul="Putra dari"
          />

          <p className="couple__amp" aria-hidden="true">
            &amp;
          </p>

          <Orang
            data={MEMPELAI.wanita}
            sisi="female"
            bingkai="/assets/img/deco/frame-female.webp"
            bingkaiH="524"
            judul="Putri dari"
          />
        </div>
      </div>
    </section>
  );
}

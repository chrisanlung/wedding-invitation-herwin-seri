/* Tiap cerita satu kartu tinggi berlatar foto (latar diatur CSS lewat
   nth-child, jadi urutannya mengikuti urutan di lib/data.js).

   Kartunya berputar tiga kali penuh di sumbu Y saat halamannya jadi aktif,
   dan teksnya baru muncul sesudah putaran berhenti - itu yang membuat
   putaran penuh mungkin, karena punggung kartu akan menampilkan teks
   terbalik seperti cermin. Semua itu murni CSS; JANGAN menambah elemen
   pembungkus di dalam <li>, karena teksnya dipilih dengan
   `.timeline__item > *` dan pembungkus baru akan ikut tersembunyi. */

import { CERITA } from "@/lib/data";

export default function Story() {
  return (
    <section className="screen screen--dark screen--gold" data-screen-label="Cerita Kami">
      <div data-px>
        <div className="head">
          <p className="eyebrow eyebrow--cream">Perjalanan</p>
          <h2 className="title">Cerita Kami</h2>
        </div>

        <ol className="timeline">
          {CERITA.map((c) => (
            <li className="timeline__item" key={c.tahun}>
              <p className="timeline__year">{c.tahun}</p>
              <h3 className="timeline__head">{c.judul}</h3>
              <p className="timeline__text">{c.teks}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Kartu acara mendatar: blok jam di kiri, keterangan di kanan. Bentuk ini
   dipilih karena lebih ringkas dari versi tegak (448px vs 717px di layar
   390px), jadi halamannya tetap muat satu layar. */

import { ACARA, TANGGAL } from "@/lib/data";

export default function Schedule() {
  return (
    <section className="screen screen--alt screen--gold" data-screen-label="Susunan Acara">
      <div data-px>
        <div className="head">
          <p className="eyebrow">{TANGGAL}</p>
          <h2 className="title">Susunan Acara</h2>
        </div>

        <div className="stack stack--rows">
          {ACARA.map((a) => (
            <div className="card card--event" key={a.tag}>
              <p className="event__time">
                <span className="event__hour">{a.jam}</span>
                <span className="event__unit">WIB</span>
              </p>
              <div className="event__body">
                <p className="tag">{a.tag}</p>
                <p className="event__place">{a.tempat}</p>
                <p className="event__addr">{a.alamat}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

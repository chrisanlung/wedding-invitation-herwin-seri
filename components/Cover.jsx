/* Halaman pertama: foto Seri & Herwin di tangga perpustakaan (bg-8) sebagai latar, nama mempelai di atasnya.

   Foto ini gambar pertama yang dilukis, jadi `fetchPriority="high"` dan TANPA
   loading="lazy" - ia justru harus didahulukan. */

import { MEMPELAI, TANGGAL } from "@/lib/data";
import Countdown from "./Countdown";

export default function Cover() {
  return (
    <section className="screen screen--cover" data-screen-label="Cover" aria-label="Pembuka">
      <div className="media media--fill" aria-hidden="true">
        <div data-px-back className="media__layer">
          <img src="/assets/img/background/bg-8.webp" alt="" width="1600" height="2401" fetchPriority="high" />
        </div>
      </div>
      <div className="scrim scrim--cover" aria-hidden="true"></div>

      <div data-px-cover className="cover__layer">
        <div className="fadeUp">
          <p className="eyebrow eyebrow--light">Undangan Pernikahan</p>
          <h1 className="cover__names">
            {MEMPELAI.pria.panggilan}
            <span className="amp">&amp;</span>
            {MEMPELAI.wanita.panggilan}
          </h1>
          <div className="rule rule--light"></div>
          <p className="cover__date">{TANGGAL}</p>
          <Countdown />
          <p className="cover__hint">Geser ke bawah</p>
        </div>
      </div>
    </section>
  );
}

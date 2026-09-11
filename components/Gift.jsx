"use client";

import { useRef, useState } from "react";
import { copyText } from "@/lib/hooks";
import { REKENING } from "@/lib/data";

function TombolSalin({ nomor }) {
  const [label, setLabel] = useState("Salin nomor");
  const timer = useRef(null);

  function salin() {
    window.clearTimeout(timer.current);
    copyText(nomor)
      .then(() => setLabel("Tersalin"))
      .catch(() => setLabel("Gagal menyalin"))
      .then(() => {
        timer.current = window.setTimeout(() => setLabel("Salin nomor"), 1800);
      });
  }

  return (
    <button type="button" className="btn btn--ghost btn--sm" onClick={salin}>
      {label}
    </button>
  );
}

export default function Gift() {
  return (
    <section className="screen screen--alt screen--center screen--gold" data-screen-label="Amplop Digital">
      <div data-px>
        <h2 className="title">Amplop Digital</h2>
        <p className="lead">
          Kehadiran Anda adalah hadiah terindah. Namun bila ingin mengirimkan tanda kasih, kami menerimanya
          dengan penuh syukur.
        </p>

        <div className="stack stack--left">
          {REKENING.map((r) => (
            <div className="card card--bank" key={r.bank}>
              <p className="tag">{r.bank}</p>
              <p className="bank__num">{r.nomor}</p>
              <p className="bank__name">{r.atasNama}</p>
              <TombolSalin nomor={r.nomor} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

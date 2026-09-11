"use client";

import { useCountdown } from "@/lib/hooks";
import { TARGET_DATE } from "@/lib/data";

const SEL = [
  ["days", "Hari"],
  ["hours", "Jam"],
  ["minutes", "Menit"],
  ["seconds", "Detik"],
];

export default function Countdown() {
  const sisa = useCountdown(TARGET_DATE);
  // sisa === null berarti hitungan pertama belum jalan (render di server).
  // Tanda "—" itulah yang membuat HTML server dan peramban sama persis.
  const selesai = sisa && sisa.selesai;

  return (
    <section className="screen screen--dark screen--center" data-screen-label="Hitung mundur">
      <div className="media media--fill media--faint" aria-hidden="true">
        <div data-px-back className="media__layer">
          <img src="/assets/img/countdown.svg" alt="" width="900" height="600" loading="lazy" />
        </div>
      </div>

      <div data-px className="screen__body">
        <p className="eyebrow eyebrow--cream">Menuju hari bahagia</p>

        <div className="countdown" id="countdown" role="timer" aria-live="off" hidden={!!selesai}>
          {SEL.map(([kunci, label]) => (
            <div className="countdown__cell" key={kunci}>
              <span className="countdown__num">{sisa ? sisa[kunci] : "—"}</span>
              <span className="countdown__lbl">{label}</span>
            </div>
          ))}
        </div>

        <p className="countdown__done" hidden={!selesai}>
          Hari bahagia itu telah tiba. Terima kasih atas doa dan kehadiran Anda.
        </p>
      </div>
    </section>
  );
}

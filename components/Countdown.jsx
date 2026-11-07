"use client";

import { useCountdown } from "@/lib/hooks";
import { TARGET_DATE } from "@/lib/data";

const SEL = [
  ["days", "Hari"],
  ["hours", "Jam"],
  ["minutes", "Menit"],
  ["seconds", "Detik"],
];

/* Hitung mundur - kini bagian dari halaman pertama (Cover), bukan section
   sendiri. Komponen klien di dalam Cover yang server component: hanya bagian
   ini yang ikut di-hidrasi. */
export default function Countdown() {
  const sisa = useCountdown(TARGET_DATE);
  // sisa === null berarti hitungan pertama belum jalan (render di server).
  // Tanda "—" itulah yang membuat HTML server dan peramban sama persis.
  const selesai = sisa && sisa.selesai;

  return (
    <>
      <div className="countdown countdown--cover" id="countdown" role="timer" aria-live="off" hidden={!!selesai}>
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
    </>
  );
}

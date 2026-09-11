"use client";

/* Tombol musik yang menempel di tepi kanan layar. Elemen <audio>-nya sendiri
   ada di <AudioProvider>, bukan di sini - lihat catatan di berkas itu. */

import { useAudio } from "@/lib/AudioProvider";

export default function MusicDock() {
  const { main, rusak, toggle } = useAudio();

  return (
    <div className="dock" aria-hidden="false">
      <div className="dock__inner">
        <button
          type="button"
          className={`musicBtn${main ? " is-playing" : ""}`}
          onClick={toggle}
          disabled={rusak}
          title={rusak ? "Musik latar belum tersedia" : undefined}
          aria-pressed={main}
          aria-label={main ? "Jeda musik latar" : "Putar musik latar"}
        >
          <span className="musicBtn__icon" aria-hidden="true">
            {main ? "❚❚" : "♪"}
          </span>
        </button>
      </div>
    </div>
  );
}

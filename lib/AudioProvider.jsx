"use client";

/* =========================================================================
   Musik latar, dipakai bersama oleh dua tempat: tombol not balok di tepi
   kanan layar, dan tombol "Buka Undangan" di halaman pembuka.

   Kenapa satu context, bukan dua <audio>: lagunya harus MULAI di dalam
   gestur tap tombol "Buka Undangan" supaya lolos aturan autoplay peramban.
   Jadi elemen <audio>-nya harus sudah ada sejak awal dan bisa dijangkau
   dari kedua tombol itu.
   ========================================================================= */

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { MUSIK } from "./data";

const AudioContext = createContext(null);

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) throw new Error("useAudio dipakai di luar <AudioProvider>");
  return ctx;
}

export function AudioProvider({ children }) {
  const ref = useRef(null);
  const [main, setMain] = useState(false);
  // Berkas lagunya tak ada / formatnya tak didukung -> tombolnya dimatikan,
  // bukan dibiarkan menghasilkan error tiap kali ditekan.
  const [rusak, setRusak] = useState(false);

  const play = useCallback(() => {
    const a = ref.current;
    if (!a || rusak) return;
    const p = a.play();
    if (p && p.catch) {
      p.catch((err) => {
        // NotAllowedError = diblokir aturan autoplay (wajar; tombol tetap hidup).
        // NotSupportedError = berkasnya memang tidak ada / tak didukung.
        if (err && err.name === "NotSupportedError") setRusak(true);
        else setMain(false);
      });
    }
  }, [rusak]);

  const toggle = useCallback(() => {
    const a = ref.current;
    if (!a || rusak) return;
    if (a.paused) play();
    else a.pause();
  }, [play, rusak]);

  // Sudah gagal dimuat sebelum React sempat memasang penangan di bawah.
  useEffect(() => {
    if (ref.current && ref.current.error) setRusak(true);
  }, []);

  return (
    <AudioContext.Provider value={{ main, rusak, play, toggle }}>
      {children}
      {/* preload=metadata: kalau berkasnya belum ada, error-nya ketahuan lebih
          awal sehingga tombol musik bisa langsung dinonaktifkan. */}
      <audio
        ref={ref}
        src={MUSIK}
        loop
        preload="metadata"
        onPlay={() => setMain(true)}
        onPause={() => setMain(false)}
        onError={() => setRusak(true)}
      />
    </AudioContext.Provider>
  );
}

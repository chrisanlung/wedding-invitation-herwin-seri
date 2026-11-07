"use client";

/* =========================================================================
   Ucapan & doa.

   Dipakai bersama oleh dua section yang berjauhan: formulir RSVP menulis,
   section Ucapan menampilkan. Karena itu daftarnya diangkat ke context.

   Dua mode, dipilih oleh NEXT_PUBLIC_RSVP_ENDPOINT (lihat lib/rsvpApi.js):

   - TERSAMBUNG (endpoint diisi): ucapan diambil dari Google Sheets, jadi
     semua tamu melihat daftar yang sama. Diambil ulang tiap menit selama
     tab terbuka dan terlihat, supaya ucapan tamu lain ikut muncul tanpa
     muat ulang. Ucapan bawaan (SEED_WISHES) hanya dipakai selama sheet
     belum punya satu ucapan pun, supaya section-nya tidak kosong.

   - LOKAL (endpoint kosong): perilaku lama - ucapan disimpan di
     localStorage peramban tamu itu sendiri dan tidak sampai ke mempelai.
   ========================================================================= */

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { SEED_WISHES, STORE_KEY } from "./data";
import { RSVP_AKTIF, ambilUcapan } from "./rsvpApi";

const JEDA_SEGARKAN = 60_000;

const WishesContext = createContext(null);

export function useWishes() {
  const ctx = useContext(WishesContext);
  if (!ctx) throw new Error("useWishes dipakai di luar <WishesProvider>");
  return ctx;
}

function bacaTersimpan() {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    const saved = raw ? JSON.parse(raw) : [];
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

export function WishesProvider({ children }) {
  // Render pertama sengaja hanya ucapan bawaan: isi localStorage berbeda-beda
  // tiap peramban, jadi kalau dibaca saat render, HTML server dan peramban
  // tak sama dan hidrasi React protes.
  const [ucapan, setUcapan] = useState(SEED_WISHES);

  useEffect(() => {
    if (!RSVP_AKTIF) {
      const tersimpan = bacaTersimpan();
      if (tersimpan.length) setUcapan(tersimpan.concat(SEED_WISHES));
      return;
    }

    let batal = false;
    async function segarkan() {
      if (document.hidden) return;
      try {
        const dariSheet = await ambilUcapan();
        if (!batal) setUcapan(dariSheet.length ? dariSheet : SEED_WISHES);
      } catch {
        /* jaringan putus / Apps Script lambat: daftar yang ada dibiarkan */
      }
    }
    segarkan();
    const t = window.setInterval(segarkan, JEDA_SEGARKAN);
    document.addEventListener("visibilitychange", segarkan);
    return () => {
      batal = true;
      window.clearInterval(t);
      document.removeEventListener("visibilitychange", segarkan);
    };
  }, []);

  const tambah = useCallback((entry) => {
    // Mode tersambung: ucapannya sudah tersimpan di sheet; di sini cukup
    // ditampilkan seketika tanpa menunggu penyegaran berikutnya.
    if (RSVP_AKTIF) {
      setUcapan((lama) => [entry, ...lama.filter((u) => !SEED_WISHES.includes(u))]);
      return;
    }
    setUcapan((lama) => [entry, ...lama]);
    try {
      const tersimpan = bacaTersimpan();
      tersimpan.unshift(entry);
      window.localStorage.setItem(STORE_KEY, JSON.stringify(tersimpan.slice(0, 50)));
    } catch {
      /* localStorage penuh atau diblokir: ucapannya tetap tampil sesi ini */
    }
  }, []);

  return <WishesContext.Provider value={{ ucapan, tambah }}>{children}</WishesContext.Provider>;
}

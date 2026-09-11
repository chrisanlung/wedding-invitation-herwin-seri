"use client";

/* =========================================================================
   Ucapan & doa.

   Dipakai bersama oleh dua section yang berjauhan: formulir RSVP menulis,
   section Ucapan menampilkan. Karena itu daftarnya diangkat ke context.

   Penyimpanannya localStorage peramban tamu - bukan basis data. Artinya
   ucapan yang dikirim hanya terlihat oleh tamu itu sendiri, dan tidak
   sampai ke mempelai. Untuk mengumpulkan RSVP sungguhan, formulir ini
   perlu disambungkan ke layanan luar (Google Form, Formspree, dll.).
   ========================================================================= */

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { SEED_WISHES, STORE_KEY } from "./data";

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
    const tersimpan = bacaTersimpan();
    if (tersimpan.length) setUcapan(tersimpan.concat(SEED_WISHES));
  }, []);

  const tambah = useCallback((entry) => {
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

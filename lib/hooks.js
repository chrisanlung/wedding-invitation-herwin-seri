"use client";

/* =========================================================================
   Kait (hook) yang dipakai bersama beberapa komponen.

   Semuanya berjalan di dalam useEffect, jadi tak ada satu pun yang menyentuh
   `window` saat render di server - itu yang bikin hidrasi Next.js pecah.
   ========================================================================= */

import { useEffect, useState } from "react";

/* ------------------------------------------------ nama tamu dari alamat */
/* Pakai ?to=Nama+Tamu (atau ?kepada= / ?nama=) untuk undangan personal.

   Sengaja TIDAK memakai useSearchParams: kait itu memaksa halaman keluar
   dari render statis dan menuntut pembungkus <Suspense>. Nama tamu cuma
   hiasan di layar, jadi membacanya sesudah halaman termuat sudah cukup. */

export function useGuestName() {
  const [nama, setNama] = useState("");

  useEffect(() => {
    let q;
    try {
      q = new URLSearchParams(window.location.search);
    } catch {
      return;
    }
    const mentah = q.get("to") || q.get("kepada") || q.get("nama") || "";
    setNama(mentah.replace(/\s+/g, " ").trim().slice(0, 60));
  }, []);

  return nama;
}

/* ------------------------------------------------------- hitung mundur */

function pad(n) {
  return String(n).length < 2 ? "0" + n : String(n);
}

export function useCountdown(targetISO) {
  // null = belum dihitung (render pertama di server dan di peramban sama-sama
  // menampilkan "—", jadi tak ada beda yang bikin hidrasi protes)
  const [sisa, setSisa] = useState(null);

  useEffect(() => {
    const target = new Date(targetISO).getTime();
    if (isNaN(target)) return;

    function tick() {
      const diff = target - Date.now();
      if (diff <= 0) {
        setSisa({ selesai: true, days: "00", hours: "00", minutes: "00", seconds: "00" });
        return true;
      }
      const s = Math.floor(diff / 1000);
      setSisa({
        selesai: false,
        days: pad(Math.floor(s / 86400)),
        hours: pad(Math.floor((s % 86400) / 3600)),
        minutes: pad(Math.floor((s % 3600) / 60)),
        seconds: pad(s % 60),
      });
      return false;
    }

    if (tick()) return;
    const timer = window.setInterval(() => {
      if (tick()) window.clearInterval(timer);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [targetISO]);

  return sisa;
}

/* ====================================================================
   Menandai halaman yang sedang aktif, supaya isinya muncul bergantian.

   Dipakai dua ukuran sekaligus: berapa banyak halaman itu mengisi layar,
   DAN berapa banyak dirinya yang terlihat. Kalau hanya salah satu, halaman
   yang lebih tinggi dari layar (HP posisi mendatar) tak pernah dianggap
   aktif dan isinya akan tetap tersembunyi.

   Kelas ditempel langsung ke DOM, bukan lewat state React: yang diamati
   bisa sampai dua belas section sekaligus dan berubah tiap gulir - render
   ulang React sebanyak itu hanya akan membuat gulirnya tersendat.
   ==================================================================== */

export function useReveal() {
  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq && mq.matches) return;
    if (!("IntersectionObserver" in window)) return;

    const screens = Array.from(document.querySelectorAll(".screen"));
    if (!screens.length) return;

    document.documentElement.classList.add("has-reveal");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const r = e.boundingClientRect;
          const root = e.rootBounds;
          if (!root || !r.height) return;
          let terlihat = Math.min(r.bottom, root.height) - Math.max(r.top, 0);
          if (terlihat < 0) terlihat = 0;
          const isiLayar = terlihat / root.height; // porsi layar yang ditutupi
          const tampakDiri = terlihat / r.height; // porsi dirinya yang terlihat
          e.target.classList.toggle("is-active", isiLayar >= 0.5 || tampakDiri >= 0.55);
        });
      },
      { threshold: [0, 0.2, 0.4, 0.55, 0.7, 0.9, 1] }
    );

    screens.forEach((s) => io.observe(s));
    return () => {
      io.disconnect();
      document.documentElement.classList.remove("has-reveal");
    };
  }, []);
}

/* ====================================================================
   Fallback paralaks untuk peramban tanpa scroll-driven animation
   (Firefox, Safari lama). Peramban modern memakai `animation-timeline:
   view()` di CSS dan kait ini langsung keluar tanpa memasang listener.

   Rumus progresnya menyamai rentang `cover` milik view(): 0 saat tepi atas
   elemen menyentuh dasar layar, 1 saat tepi bawahnya melewati puncak layar.
   ==================================================================== */

export function useParallaxFallback() {
  useEffect(() => {
    const mq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq && mq.matches) return;
    if (window.CSS && CSS.supports && CSS.supports("animation-timeline", "view()")) return;

    const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const $$ = (sel) => Array.from(document.querySelectorAll(sel));
    let queued = false;

    function paint() {
      queued = false;
      const vh = window.innerHeight || 1;

      $$("[data-px]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const p = clamp((vh - r.top) / (vh + r.height));
        const inn = clamp(p / 0.18);
        const out = clamp((p - 0.82) / 0.18);
        el.style.opacity = String(Math.min(inn, 1 - out));
        el.style.transform = "translate3d(0," + (52 - 104 * p).toFixed(2) + "px,0)";
      });

      $$("[data-px-back]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const p = clamp((vh - r.top) / (vh + r.height));
        el.style.transform = "translate3d(0," + (-10 + 20 * p).toFixed(2) + "%,0)";
      });

      $$("[data-px-cover]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const q = clamp(-r.top / ((r.height || vh) * 0.85));
        el.style.opacity = String(1 - q);
        el.style.transform = "translate3d(0," + (-120 * q).toFixed(2) + "px,0)";
      });
    }

    function onScroll() {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(paint);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("orientationchange", onScroll);
    paint();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("orientationchange", onScroll);
    };
  }, []);
}

/* --------------------------------------------------- salin ke papan klip */

export function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  }
  // Peramban lama / halaman tanpa HTTPS: jalur cadangan lewat textarea.
  return new Promise((resolve, reject) => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "-1000px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      ok ? resolve() : reject();
    } catch (e) {
      reject(e);
    }
  });
}

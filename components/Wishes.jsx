"use client";

import { useEffect, useRef } from "react";
import { useWishes } from "@/lib/WishesProvider";

/* Berapa BARIS ucapan yang terlihat sebelum daftarnya digulir di tempat.
   HP satu kolom -> 3 ucapan; desktop dua kolom (lihat .wishes di blok 760px
   globals.css) -> 6 ucapan. Jumlah kolom dibaca dari CSS-nya, jadi angka ini
   tidak perlu diubah kalau breakpoint-nya pindah. */
const BARIS_TERLIHAT = 3;

/* Tinggi daftar diukur, bukan dipatok di CSS: panjang ucapan beda-beda,
   jadi "3 ucapan" tidak bisa ditulis sebagai satu angka rem. Batas atasnya
   tetap 60% tinggi layar supaya tiga ucapan yang sangat panjang tidak
   mendorong section ini jauh melewati satu layar. */
function aturTinggi(list) {
  const kolom = getComputedStyle(list).gridTemplateColumns.split(" ").filter(Boolean).length || 1;
  const n = BARIS_TERLIHAT * (getComputedStyle(list).display === "grid" ? kolom : 1);
  const anak = list.children;
  if (anak.length <= n) {
    list.style.maxHeight = "";
    list.classList.remove("wishes--scroll");
    return;
  }
  const gap = parseFloat(getComputedStyle(list).rowGap) || 0;
  // offsetTop mengabaikan transform, jadi animasi reveal tidak mengacaukannya.
  const tinggi = anak[n].offsetTop - anak[0].offsetTop - gap;
  list.style.maxHeight = `${Math.min(tinggi, window.innerHeight * 0.6)}px`;
  list.classList.add("wishes--scroll");
}

export default function Wishes() {
  const { ucapan } = useWishes();
  const ref = useRef(null);

  useEffect(() => {
    const list = ref.current;
    if (!list) return;
    // Ucapan baru selalu di urutan teratas - gulir balik ke sana.
    list.scrollTop = 0;
    const ukur = () => aturTinggi(list);
    ukur();
    // Ukur ulang saat font selesai dimuat atau lebar layar berubah.
    const ro = new ResizeObserver(ukur);
    Array.from(list.children).forEach((el) => ro.observe(el));
    window.addEventListener("resize", ukur);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", ukur);
    };
  }, [ucapan]);

  return (
    <section className="screen screen--gold" data-screen-label="Ucapan">
      <div data-px>
        <h2 className="title title--center">Ucapan &amp; Doa</h2>
        {/* Urutannya sudah terbaru dulu: dari sheet diambil dari baris
            terbawah, dan ucapan lokal ditaruh di depan (lib/WishesProvider). */}
        <div className="wishes" ref={ref} tabIndex={0} aria-label="Daftar ucapan dan doa">
          {ucapan.map((u, i) => (
            // Nama bisa sama (mis. dua kiriman dari orang yang sama), jadi
            // kuncinya digabung dengan urutan - bukan nama saja.
            <div className="wish" key={`${u.name}-${i}`}>
              <p className="wish__name">{u.name}</p>
              <p className="wish__msg">{u.message}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

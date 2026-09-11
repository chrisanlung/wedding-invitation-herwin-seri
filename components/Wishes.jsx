"use client";

import { useWishes } from "@/lib/WishesProvider";

export default function Wishes() {
  const { ucapan } = useWishes();

  return (
    <section className="screen screen--gold" data-screen-label="Ucapan">
      <div data-px>
        <h2 className="title title--center">Ucapan &amp; Doa</h2>
        <div className="wishes">
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

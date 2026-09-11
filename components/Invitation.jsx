"use client";

/* =========================================================================
   Akar undangan: memasang dua penyedia state bersama, menjalankan dua kait
   yang berlaku untuk seluruh halaman, lalu menyusun dua belas section.

   Urutan section di sini = urutan gulir. Kemiringan kartu galeri dan jeda
   animasi kartu cerita diatur CSS lewat nth-child, jadi menukar urutan
   section aman, tapi menukar urutan ISI di dalamnya tidak.
   ========================================================================= */

import { AudioProvider } from "@/lib/AudioProvider";
import { WishesProvider } from "@/lib/WishesProvider";
import { useParallaxFallback, useReveal } from "@/lib/hooks";

import Gate from "./Gate";
import Cover from "./Cover";
import Verse from "./Verse";
import Couple from "./Couple";
import Countdown from "./Countdown";
import Schedule from "./Schedule";
import Location from "./Location";
import Story from "./Story";
import Gallery from "./Gallery";
import Rsvp from "./Rsvp";
import Wishes from "./Wishes";
import Gift from "./Gift";
import Closing from "./Closing";
import Cupids from "./Cupids";
import MusicDock from "./MusicDock";

export default function Invitation() {
  useReveal();
  useParallaxFallback();

  return (
    <AudioProvider>
      <WishesProvider>
        <Gate />

        <main className="shell" id="shell">
          <Cover />
          <Verse />
          <Couple />
          <Countdown />
          <Schedule />
          <Location />
          <Story />
          <Gallery />
          <Rsvp />
          <Wishes />
          <Gift />
          <Closing />
        </main>

        <Cupids />
        <MusicDock />
      </WishesProvider>
    </AudioProvider>
  );
}

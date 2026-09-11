import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

/* Huruf diambil lewat next/font: berkasnya ikut ter-build dan dilayani dari
   domain sendiri, jadi tak ada permintaan ke fonts.googleapis.com saat
   undangan dibuka - satu perjalanan jaringan lebih sedikit di jaringan HP,
   dan tidak ada kedipan huruf pengganti. Nama keluarga hurufnya otomatis,
   jadi dipasang sebagai variabel CSS yang dipakai globals.css. */
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

const sans = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata = {
  /* Dipakai untuk mengubah alamat gambar OG jadi absolut - pratinjau di
     WhatsApp/Facebook menolak alamat relatif. Saat sudah online, isi
     NEXT_PUBLIC_SITE_URL di .env.local dengan domainmu. */
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Undangan Pernikahan Herwin & Seri",
  description:
    "Undangan pernikahan Herwin & Seri — Sabtu, 13 Februari 2027 di Jakarta. Merupakan kebahagiaan bagi kami apabila Anda berkenan hadir.",
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "id_ID",
    title: "Undangan Pernikahan Herwin & Seri",
    description: "Sabtu, 13 Februari 2027 · Jakarta",
    // Ganti jadi URL absolut saat sudah online, mis.
    // https://domainmu.com/assets/img/page-1.webp
    images: ["/assets/img/page-1.webp"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  /* Warna bilah peramban di HP. Harus ikut palet: kalau tertinggal krem,
     bilah atasnya terang sementara halamannya anggur gelap. */
  themeColor: "#4A1220",
};

export default function RootLayout({ children }) {
  return (
    /* `is-locked` dipasang sejak HTML pertama, bukan sesudah React jalan:
       halaman di baliknya harus sudah terkunci sebelum satu piksel pun
       terlihat, kalau tidak isinya sempat berkedip di balik halaman pembuka.
       Kelas ini dilepas oleh <Gate> begitu undangannya dibuka. */
    <html lang="id" className={`is-locked ${serif.variable} ${sans.variable}`}>
      <head>
        {/* Tanpa JavaScript: buka kuncinya, sembunyikan halaman pembuka. */}
        <noscript>
          <style>{`
            html.is-locked, body.is-locked { overflow: auto !important; height: auto !important; }
            .gate { display: none !important; }
            /* Tanpa JS kelas is-locked tak pernah dilepas, jadi aturan jeda
               animasi di globals.css akan membekukan isi undangan selamanya.
               Dibatalkan di sini. */
            html.is-locked .shell *,
            html.is-locked .cupid,
            html.is-locked .cupid__strip { animation-play-state: running !important; }
          `}</style>
        </noscript>
      </head>
      <body className="is-locked">{children}</body>
    </html>
  );
}

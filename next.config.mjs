/** @type {import('next').NextConfig} */
const nextConfig = {
  // Semua gambar sudah dioptimalkan tangan (WebP, ukuran pas dengan slotnya),
  // dan halaman ini dipakai sebagai situs statis - jadi pengoptimal gambar
  // bawaan Next tidak diperlukan. Mematikannya membuat `output: "export"`
  // bisa dipakai kapan saja tanpa penyesuaian lain.
  images: { unoptimized: true },

  /* Lencana bundar Next.js di pojok kiri bawah saat `next dev`.

     Lencana ini HANYA ada di mode pengembangan - sudah dicek: HTML dari
     `next start` tidak memuat overlay-nya sama sekali, jadi tamu undangan
     tidak pernah melihatnya dan ini bukan soal tampilan di Vercel. Dimatikan
     semata supaya tidak menghalangi saat menata tata letak.

     Mematikannya TIDAK menyembunyikan error: Next tetap menampilkan galat
     kompilasi maupun runtime lewat overlay layar penuhnya. */
  devIndicators: false,
};

export default nextConfig;

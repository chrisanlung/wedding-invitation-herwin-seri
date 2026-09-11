/** @type {import('next').NextConfig} */
const nextConfig = {
  // Semua gambar sudah dioptimalkan tangan (WebP, ukuran pas dengan slotnya),
  // dan halaman ini dipakai sebagai situs statis - jadi pengoptimal gambar
  // bawaan Next tidak diperlukan. Mematikannya membuat `output: "export"`
  // bisa dipakai kapan saja tanpa penyesuaian lain.
  images: { unoptimized: true },
};

export default nextConfig;

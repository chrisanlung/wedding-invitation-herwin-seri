# Undangan Pernikahan Herwin &amp; Seri — versi Next.js

Undangan satu halaman yang bergulir per-layar, dipindahkan dari versi statis
(HTML + CSS + satu berkas JS) ke Next.js App Router.

```
app/
  layout.js      ← metadata, huruf, kunci gulir awal
  page.js        ← memanggil <Invitation />
  globals.css    ← SELURUH gaya undangan (salinan dari versi lama)
components/      ← satu berkas per section + gerbang, cupid, tombol musik
lib/
  data.js        ← semua isi undangan: nama, tanggal, acara, lokasi, cerita…
  hooks.js       ← nama tamu, hitung mundur, penanda halaman aktif, paralaks
  AudioProvider  ← musik latar (dipakai gerbang + tombol not balok)
  WishesProvider ← ucapan (ditulis RSVP, ditampilkan section Ucapan)
public/assets/   ← hanya aset yang benar-benar dipakai (4,7 MB)
```

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000
```

Untuk produksi:

```bash
npm run build
npm start
```

Ingin jadi berkas statis biasa (bisa ditaruh di hosting apa pun, termasuk
Laragon): tambahkan `output: "export"` di `next.config.mjs`, lalu `npm run
build` akan menghasilkan folder `out/`. Seluruh halaman ini memang sudah
dirender statis — tak ada satu pun bagian yang butuh server.

## Mengubah isi

Hampir semuanya ada di **`lib/data.js`**: nama mempelai dan orang tua, tanggal,
ayat, susunan acara, tautan Maps, cerita, daftar foto galeri, nomor rekening,
dan ucapan bawaan. Tak perlu membuka satu pun komponen.

> `TARGET_DATE` dan `TANGGAL` harus sepadan. Yang pertama dipakai hitung
> mundur, yang kedua yang tertulis di layar. Kalau berbeda, hitung mundurnya
> meleset tanpa ada yang terlihat salah — ini pernah terjadi dan baru
> ketahuan setelah selisihnya 28 hari.

Undangan personal: tambahkan `?to=Nama+Tamu` di belakang alamat. Namanya muncul
di halaman pembuka dan mengisi kolom nama di RSVP. Juga menerima `?kepada=`
dan `?nama=`.

## Yang perlu diketahui sebelum menyebar undangan

**RSVP tidak terkirim ke mana pun.** Ucapan disimpan di `localStorage`
peramban tamu itu sendiri, jadi hanya dia yang melihatnya — mempelai tidak
menerima apa pun. Untuk mengumpulkan konfirmasi sungguhan, sambungkan fungsi
`kirim()` di `components/Rsvp.jsx` ke layanan luar (Google Form, Formspree,
atau API sendiri).

**Nomor rekening di `lib/data.js` masih contoh** (1234567890 / 0987654321).

## Catatan teknis

**Gaya disalin apa adanya.** `app/globals.css` adalah salinan `style.css` dari
versi statis. Hampir setiap angka di dalamnya hasil pengukuran — tinggi
section supaya muat satu layar, kontras teks di atas foto, sudut putaran kartu
cerita, sambungan galeri yang harus meleset 0,00px. Jangan diubah tanpa
mengukur ulang. Yang berbeda dari aslinya hanya dua: alamat gambar (`../img/`
→ `/assets/img/`) dan dua variabel huruf yang kini menunjuk next/font.

**`overflow: clip`, bukan `hidden`.** Ini jebakan paling mahal di proyek ini:
`overflow: hidden` menjadikan elemennya *scroll container*, sehingga
`animation-timeline: view()` membaca progresnya mentok di 0% dan SELURUH isi
halaman tidak terlihat sama sekali. Kalau suatu saat isinya hilang total,
periksa ini lebih dulu.

**Kelas halaman aktif ditempel langsung ke DOM**, bukan lewat state React
(`lib/hooks.js`, `useReveal`). Yang diamati dua belas section dan berubah tiap
gulir; render ulang React sebanyak itu hanya membuat gulirnya tersendat.

**Hidrasi.** Tiga hal yang berbeda antara server dan peramban sengaja ditunda
ke `useEffect`, bukan dibaca saat render: nama tamu dari alamat, isi
`localStorage`, dan angka hitung mundur (render pertama menampilkan `—`).
Membacanya saat render membuat HTML server dan peramban tak sama, dan React
akan protes.

**Huruf lewat `next/font`**, jadi berkasnya dilayani dari domain sendiri — satu
perjalanan jaringan lebih sedikit dan tak ada kedipan huruf pengganti.
Konsekuensinya `npm run build` butuh koneksi internet sekali untuk mengunduh
berkas hurufnya.

**Aset.** Hanya yang benar-benar dirujuk yang disalin ke `public/assets`: 25
berkas, 4,7 MB (3,6 MB di antaranya lagu). Folder aset proyek lama berisi 82 MB
— sisanya bahan mentah dan aset cadangan yang tak pernah dimuat.

## Perbedaan dengan versi statis

Tidak ada, secara tampilan. Halaman pembuka kedua versi dibandingkan piksel
demi piksel di 390×844 dan 1440×900: **0 piksel berbeda**. Tinggi kedua belas
section juga identik sampai satuan piksel.

Yang berubah hanya di dalam: satu berkas JS imperatif jadi komponen React,
isi undangan terpisah dari tampilannya, dan nama berkas lagu dirapikan
(`menjadi milikku-adera, kunto aji, segara.mp3` → `menjadi-milikku.mp3`)
supaya tak perlu `%20` di mana-mana.

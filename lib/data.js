/* =========================================================================
   Semua isi undangan dikumpulkan di satu berkas.

   Tujuannya: mengubah nama, tanggal, susunan acara, atau nomor rekening
   cukup di sini - tak perlu membuka satu pun komponen.
   ========================================================================= */

/* Hari-H dalam WIB. HARUS sama dengan tanggal yang tertulis di TANGGAL
   di bawah; kalau berbeda, hitung mundurnya akan meleset tanpa ada yang
   terlihat salah di layar. */
export const TARGET_DATE = "2027-02-13T08:00:00+07:00";
export const TANGGAL = "Sabtu, 13 Februari 2027";

/* Ayah dan ibu ditulis TERPISAH, bukan satu kalimat "A & B".

   Di layar keduanya memang ditampilkan bertingkat dengan "&" di barisnya
   sendiri. Kalau disimpan sebagai satu kalimat, komponennya harus memecah
   string itu di " & " - dan pemecahan itu langsung salah begitu ada nama
   yang memuat "&" (mis. gelar atau nama usaha keluarga). Dua field
   menghilangkan tebakan itu sama sekali. */
export const MEMPELAI = {
  pria: {
    nama: "Herwin Tjoegito",
    panggilan: "Herwin",
    ayah: "Bapak Jimmy Tjoegito",
    ibu: "Ibu Weniwaty Tanuwijaya",
    foto: "/assets/img/bride-groom/groom.webp",
    fotoW: 297,
    fotoH: 380,
  },
  wanita: {
    nama: "Seri Ezra",
    panggilan: "Seri",
    ayah: "Bapak Binsar Rajagukguk",
    ibu: "Ibu Sofia Boru. Sigalingging",
    foto: "/assets/img/bride-groom/bride.webp",
    fotoW: 356,
    fotoH: 520,
  },
};

export const AYAT = {
  teks: "Aku mengucap syukur kepada Allahku setiap kali aku mengingat kamu.",
  sumber: "Filipi 1 : 3",
};

/* Susunan acara tampil sebagai garis waktu berkelok - tiap acara punya satu
   gambar yang berselang kiri-kanan. Untuk sekarang gambarnya memakai foto
   tempat yang sudah ada.

   Tea Pai dan Resepsi digabung jadi SATU acara karena tempatnya sama
   (Leviticus 11). `jam` = jam mulai acara gabungan; jam masing-masing
   bagiannya ditulis di `rincian` (opsional) supaya tidak hilang.

   `maps` = tautan tombol "Buka Maps" (dulu ada di halaman Lokasi, kini
   digabung ke sini). Pakai tautan pendek resmi Google Maps (Bagikan ->
   Salin tautan); keduanya sudah dicek mengarah ke tempat yang benar.

   Mau mengganti dengan ilustrasi sendiri? Taruh berkasnya di
   public/assets/img/acara/ lalu ubah `gambar`, `gambarW`, dan `gambarH` di
   sini saja - komponen dan CSS-nya tidak perlu disentuh. Ukuran yang paling
   pas bentuknya mendatar (rasio kira-kira 4:3 sampai 16:9); gambar tegak
   akan terpotong atas-bawahnya karena tinggi barisnya dipatok agar bagian
   ini tetap muat satu layar. */
export const ACARA = [
  {
    jam: "08.00",
    tag: "Pemberkatan",
    tempat: "Gereja Santo Stephanus",
    alamat: "Cilandak, Jakarta Selatan",
    maps: "https://maps.app.goo.gl/o8FFx2XMo9C6S7666",
    gambar: "/assets/img/places/gereja.webp",
    gambarW: 900,
    gambarH: 506,
    gambarAlt: "Gereja Santo Stephanus, tempat pemberkatan",
  },
  {
    jam: "17.00",
    tag: "Tea Pai & Resepsi",
    // \u00a0 = spasi tak terputus: tiap acara tetap menempel dengan jamnya.
    rincian: "Tea\u00a0pai\u00a017.00 · Resepsi\u00a018.00",
    tempat: "Leviticus 11",
    alamat: "Jakarta",
    maps: "https://maps.app.goo.gl/dCJYdq4uqrwCu2S27",
    gambar: "/assets/img/places/leviticus-11.webp",
    gambarW: 680,
    gambarH: 382,
    gambarAlt: "Leviticus 11, tempat tea pai ceremony dan resepsi",
  },
];

export const CERITA = [
  {
    tahun: "2009",
    judul: "Pertemuan Pertama",
    teks: "Dimulai dari tempat Les Pelajaran, yang sejak itu percakapan dan persahabatan kami ikatkan.",
  },
  {
    tahun: "2024",
    judul: "Bertumbuh Bersama",
    teks: "Perjalanan panjang yang masing masing kami lalui menjadi pelekat hubungan kami. Walau jarak yang memisahkan, bercerita tetap tersampaikan. Dan salah satu alasan untuk kami bertumbuh bersama adalah sebuah penerimaan.",
  },
  {
    tahun: "2026",
    judul: "Lamaran",
    teks: "Apalah arti keseriusan tanpa lamaran dan pernikahan, salah satu pembuktian cinta kami berdua untuk memutuskan berjalan berdua.",
  },
];

/* Kemiringan kartu diambil dari posisinya DI DALAM SET (lihat Kartu di
   components/Gallery.jsx), jadi jumlah foto bebas - tiap salinan set tetap
   persis sama dan sambungan jalannya tak terlihat. */
export const GALERI = [
  { src: "/assets/img/galeri/galeri-1.webp", w: 508, h: 608, alt: "Herwin dan Seri berdekatan dalam busana pengantin" },
  { src: "/assets/img/galeri/galeri-2.webp", w: 1080, h: 720, alt: "Seri bergaun pengantin di tangga perpustakaan, Herwin menunggu di balkon" },
  { src: "/assets/img/galeri/galeri-3.webp", w: 508, h: 518, alt: "Herwin dan Seri bergandengan tangan di depan hiasan pernikahan" },
  { src: "/assets/img/galeri/galeri-4.webp", w: 720, h: 1080, alt: "Herwin dan Seri berdiri di balkon perpustakaan" },
  { src: "/assets/img/galeri/galeri-5.webp", w: 720, h: 1080, alt: "Herwin dan Seri duduk membaca di lorong rak buku" },
  { src: "/assets/img/galeri/galeri-6.webp", w: 720, h: 1080, alt: "Herwin memeluk Seri dari belakang di antara rak buku" },
  { src: "/assets/img/galeri/galeri-7.webp", w: 695, h: 930, alt: "Herwin dan Seri dalam busana sangjit di depan dekorasi merah emas" },
];

export const REKENING = [
  { bank: "Bank BCA", nomor: "3431259468", atasNama: "a.n. Herwin Tjoegito" },
  { bank: "Bank BCA", nomor: "2920748361", atasNama: "a.n. Seri Ezra" },
];

/* Ucapan bawaan yang selalu tampil. Ucapan dari tamu disimpan di
   localStorage peramban masing-masing dan ditaruh di ATAS daftar ini. */
export const STORE_KEY = "undangan-herwin-seri:wishes";

export const SEED_WISHES = [
  {
    name: "Keluarga Tjoegito",
    message:
      "Selamat Herwin & Seri! Selamat menempuh hidup baru. Semoga pernikahan kalian selalu dipenuhi cinta, kebahagiaan, kesabaran, dan saling pengertian. Semoga setiap langkah yang kalian jalani bersama membawa sukacita, rezeki yang berlimpah, serta menjadi keluarga yang harmonis dan penuh kasih hingga hari tua.",
  },
  {
    name: "Keluarga Ragaguguk",
    message: "Selamat untuk Herwin & Seri! Semoga Tuhan memberkati rumah tangga kalian dengan damai dan sukacita.",
  },
  {
    name: "Anto & Fanie",
    message: "Turut berbahagia. Sampai jumpa di Leviticus 11!",
  },
];

/* SAMAKAN EKSTENSI DENGAN ISI BERKASNYA. Ini bukan formalitas.

   Lagu sebelumnya bernama .mp3 padahal isinya kontainer MP4 berisi AAC
   (ftyp/moov/mp4a, tanpa satu pun sync-word MP3). Server jadi mengirim
   Content-Type: audio/mpeg yang tidak cocok dengan isinya. Chrome desktop
   memaafkan dan tetap memutar, tapi Safari iOS menolak - lagunya diam di HP
   dan tombol musiknya ikut mati karena <audio> memicu onError.

   Cara memeriksanya: lihat byte awal berkasnya. "ID3" atau FF Ex/Fx = MP3
   asli -> .mp3. "ftyp" di byte ke-4 = MP4/M4A -> .m4a. Berkas ini sudah
   dicek: tag ID3 di awal dan sync-word di offset 138, jadi MP3 sungguhan.

   Nama berkas juga sengaja tanpa spasi. Spasi berubah jadi %20 di URL -
   jalan di kebanyakan tempat, tapi titik rapuh yang tak perlu ada. */
export const MUSIK = "/assets/bgm/when-you-know.mp3";

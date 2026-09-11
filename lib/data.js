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

export const MEMPELAI = {
  pria: {
    nama: "Herwin",
    panggilan: "Herwin",
    orangTua: "Bapak Jimmy Tjoegito & Ibu Weniwaty Tanuwijaya",
    foto: "/assets/img/bride-groom/groom.webp",
    fotoW: 297,
    fotoH: 380,
  },
  wanita: {
    nama: "Seri Ezra",
    panggilan: "Seri",
    orangTua: "Bapak Binsar Rajagukguk & Ibu Sofia Boru",
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
   tempat yang sudah ada; Tea Pai dan Resepsi memang berbagi satu foto karena
   keduanya di Leviticus 11.

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
    gambar: "/assets/img/places/gereja.webp",
    gambarW: 900,
    gambarH: 506,
    gambarAlt: "Gereja Santo Stephanus, tempat pemberkatan",
  },
  {
    jam: "17.00",
    tag: "Tea Pai Ceremony",
    tempat: "Leviticus 11",
    alamat: "Jakarta",
    gambar: "/assets/img/places/leviticus-11.webp",
    gambarW: 680,
    gambarH: 382,
    gambarAlt: "Leviticus 11, tempat tea pai ceremony",
  },
  {
    jam: "18.00",
    tag: "Resepsi",
    tempat: "Leviticus 11",
    alamat: "Jakarta",
    gambar: "/assets/img/places/leviticus-11.webp",
    gambarW: 680,
    gambarH: 382,
    gambarAlt: "",
  },
];

/* Tautan peta memakai tautan pendek resmi Google Maps (Bagikan -> Salin
   tautan). Keduanya sudah dicek mengarah ke tempat yang benar. */
export const LOKASI = [
  {
    tempat: "Gereja Santo Stephanus",
    keterangan: "Pemberkatan Pernikahan",
    maps: "https://maps.app.goo.gl/o8FFx2XMo9C6S7666",
  },
  {
    tempat: "Leviticus 11",
    keterangan: "Tea pai ceremony & resepsi",
    maps: "https://maps.app.goo.gl/dCJYdq4uqrwCu2S27",
  },
];

export const CERITA = [
  {
    tahun: "2019",
    judul: "Pertemuan pertama",
    teks: "Berkenalan lewat sebuah kegiatan bersama, lalu percakapan yang tak pernah benar-benar selesai.",
  },
  {
    tahun: "2022",
    judul: "Bertumbuh bersama",
    teks: "Melewati jarak, pekerjaan, dan banyak doa — dan memutuskan untuk terus berjalan berdua.",
  },
  {
    tahun: "2026",
    judul: "Melamar",
    teks: "Satu pertanyaan sederhana, satu jawaban yang paling mudah: ya.",
  },
];

/* Urutannya penting: kemiringan kartu galeri diatur CSS dengan pola
   nth-child(6n+1..6n+6), dan set kedua yang jadi salinan harus persis sama
   supaya sambungan jalannya tak terlihat. */
export const GALERI = [
  { src: "/assets/img/galeri/galeri-1.webp", w: 508, h: 608, alt: "Herwin dan Seri berdekatan dalam busana pengantin" },
  { src: "/assets/img/galeri/galeri-2.webp", w: 633, h: 700, alt: "Herwin dan Seri berfoto berdua saat jalan-jalan" },
  { src: "/assets/img/galeri/galeri-3.webp", w: 508, h: 518, alt: "Herwin dan Seri bergandengan tangan di depan hiasan pernikahan" },
  { src: "/assets/img/galeri/galeri-4.webp", w: 640, h: 661, alt: "Herwin dan Seri di sebuah kafe" },
  { src: "/assets/img/galeri/galeri-5.webp", w: 335, h: 325, alt: "Herwin dan Seri duduk berdampingan saat acara keluarga" },
  { src: "/assets/img/galeri/galeri-6.webp", w: 640, h: 565, alt: "Herwin dan Seri makan bersama di sebuah rumah makan" },
];

export const REKENING = [
  { bank: "Bank BCA", nomor: "1234567890", atasNama: "a.n. Herwin Tjoegito" },
  { bank: "Bank Mandiri", nomor: "0987654321", atasNama: "a.n. Seri Ezra" },
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

export const MUSIK = "/assets/bgm/menjadi-milikku.mp3";

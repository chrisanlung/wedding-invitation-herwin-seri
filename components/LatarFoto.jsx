/* Foto latar untuk section yang memakai .screen--gold.

   Section beremas biasanya tembus pandang dan memperlihatkan latar bunga di
   belakang halaman (body::before). Komponen ini menaruh foto DI ATAS latar
   section itu, lalu tabir anggur di atas foto, supaya teks dan warna teks
   section (yang disetel untuk latar anggur) tetap berlaku apa adanya.

   Wajib anak PERTAMA section: media dan tabirnya absolute, isi section yang
   menyusul (position: relative dari .screen--gold > *) dilukis di atasnya.

   data-px-back = lapisan paralaks belakang, sama seperti Hitung Mundur dan
   Penutup (lihat useParallaxFallback di lib/hooks.js).

   `posisi` = object-position fotonya. Penting untuk foto mendatar yang
   dipakai di layar HP tegak: tanpa itu yang tersisa cuma bagian tengahnya.

   `srcMobile` (opsional) = foto lain khusus layar < 760px, lewat <picture>,
   jadi HP hanya mengunduh foto HP dan desktop hanya foto desktop. Posisinya
   diatur sendiri lewat `posisiMobile`, karena potongan foto tegak di HP
   tak ada hubungannya dengan potongan foto mendatar di desktop. Batas
   760px sama dengan blok desktop di globals.css. */
export default function LatarFoto({ src, posisi = "50% 50%", srcMobile, posisiMobile = "50% 50%" }) {
  const gaya = {
    "--latar-pos": posisi,
    "--latar-pos-m": srcMobile ? posisiMobile : posisi,
  };
  return (
    <>
      <div className="media media--fill latar-foto" aria-hidden="true">
        <div data-px-back className="media__layer">
          <picture>
            {srcMobile && <source media="(max-width: 759px)" srcSet={srcMobile} />}
            <img src={src} alt="" loading="lazy" style={gaya} />
          </picture>
        </div>
      </div>
      <div className="scrim scrim--tabir" aria-hidden="true"></div>
    </>
  );
}

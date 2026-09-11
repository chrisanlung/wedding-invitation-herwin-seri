/* Kartu lokasi berlatar foto tempatnya (diatur CSS lewat nth-child, jadi
   URUTANNYA penting: kartu pertama = gereja, kedua = Leviticus 11).

   Petanya sengaja tautan, bukan iframe tersemat: peta tersemat menangkap
   sapuan jari sehingga bisa menahan gulir di halaman yang bergulir
   satu-layar-satu-halaman seperti ini. */

import { LOKASI } from "@/lib/data";

export default function Location() {
  return (
    <section className="screen screen--center screen--gold" data-screen-label="Lokasi">
      <div data-px>
        <h2 className="title">Lokasi Acara</h2>
        <p className="lead lead--tight">Tekan tombol untuk membuka petunjuk arah.</p>

        <div className="stack stack--wide">
          {LOKASI.map((l) => (
            <div className="card card--venue" key={l.tempat}>
              <div className="card__body">
                <p className="event__place">{l.tempat}</p>
                <p className="event__addr">{l.keterangan}</p>
                <a className="btn btn--ghost" href={l.maps} target="_blank" rel="noopener noreferrer">
                  Buka Maps
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

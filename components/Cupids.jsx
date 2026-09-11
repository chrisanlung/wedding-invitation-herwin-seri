/* Dua cupid yang melayang ke sana ke mari mengelilingi undangan. Jalurnya
   murni CSS (cupidRoamA 42s / cupidRoamB 55s, bercermin satu sama lain).

   Murni hiasan: aria-hidden + pointer-events:none di CSS, jadi tak
   mengganggu pembaca layar maupun sentuhan. */

export default function Cupids() {
  return (
    <>
      <div className="cupid cupid--a" aria-hidden="true">
        <img className="cupid__img" src="/assets/img/cupid.png" alt="" width="307" height="340" />
      </div>
      <div className="cupid cupid--b" aria-hidden="true">
        <img className="cupid__img" src="/assets/img/cupid.png" alt="" width="307" height="340" />
      </div>
    </>
  );
}

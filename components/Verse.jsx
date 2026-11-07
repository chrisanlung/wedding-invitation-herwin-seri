import { AYAT } from "@/lib/data";
import LatarFoto from "./LatarFoto";

export default function Verse() {
  return (
    <section className="screen screen--alt screen--center screen--gold" data-screen-label="Ayat">
      <LatarFoto
        src="/assets/img/background/bg-5.webp"
        posisi="22% 50%"
        srcMobile="/assets/img/background/bg-6.webp"
        posisiMobile="50% 45%"
      />
      <div data-px>
        <img
          className="deco deco--swag"
          src="/assets/img/deco/swag.webp"
          alt=""
          aria-hidden="true"
          width="520"
          height="124"
          loading="lazy"
        />
        <p className="verse">&ldquo;{AYAT.teks}&rdquo;</p>
        <p className="verse__ref">{AYAT.sumber}</p>
      </div>
    </section>
  );
}

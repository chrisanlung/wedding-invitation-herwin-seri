import { AYAT } from "@/lib/data";

export default function Verse() {
  return (
    <section className="screen screen--alt screen--center screen--gold" data-screen-label="Ayat">
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

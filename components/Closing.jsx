import { MEMPELAI } from "@/lib/data";

export default function Closing() {
  return (
    <section className="screen screen--closing screen--center" data-screen-label="Penutup">
      <div className="media media--fill" aria-hidden="true">
        <div data-px-back className="media__layer">
          <img src="/assets/img/penutup.svg" alt="" width="900" height="1000" loading="lazy" />
        </div>
      </div>
      <div className="scrim scrim--solid" aria-hidden="true"></div>

      <div data-px className="screen__body">
        <img
          className="deco deco--dove"
          src="/assets/img/deco/dove.webp"
          alt=""
          aria-hidden="true"
          width="240"
          height="150"
          loading="lazy"
        />
        <p className="closing__text">
          Merupakan suatu kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.
        </p>
        <p className="eyebrow eyebrow--cream">Dengan kasih</p>
        <p className="closing__names">
          {MEMPELAI.pria.panggilan} <span className="amp amp--inline">&amp;</span>{" "}
          {MEMPELAI.wanita.panggilan}
        </p>
      </div>
    </section>
  );
}

import Image from "next/image";
import { DynamicIcon } from "lucide-react/dynamic";
import ContactForm from "../contactform";
import styles from "./styles.module.css";

const Banner = ({ bannerdata = {}, contactFormRef, ipName }) => {
  const benefits = bannerdata?.benefits ?? bannerdata?.points ?? [];

  return (
    <section className={styles.bannersec} aria-label="Hero — Decoding of Practice">
      {/* Background image — preserved existing asset: /assets/home/banner-img.jpg */}
      <div className={styles.bgWrap} aria-hidden="true">
        <Image
          src="/assets/home/banner-img.jpg"
          alt="VLS Law Academy — Decoding of Practice legal practice masterclass"
          fill
          priority
          sizes="100vw"
          className={styles.bgimg}
        />
      </div>

      <div className="container">
        <div className="row align-items-center">
          <div className="col-xl-7 col-lg-6 col-12 pt-xl-5 pt-0">
            <div className={styles.bannertitle}>
              {/* Eyebrow */}
              <p className={styles.eyebrow}>
                VLS Law Academy &bull; Practical Legal Masterclass
              </p>

              {/* H1 — Decoding of Practice */}
              <h1 className={styles.mainheading}>
                {bannerdata?.heading?.titlebold ?? "Decoding of Practice"}
              </h1>

              {/* AI Descriptor Badge */}
              <div className={styles.aibadge} aria-label="Now AI-Assisted">
                <span className={styles.aibadgeinner}>
                  {bannerdata?.heading?.descriptor ?? "Now AI-Assisted"}
                </span>
              </div>

              {/* Hook line */}
              <p className={styles.hookline}>
                {bannerdata?.heading?.hook ??
                  "Real Legal Practice. Now Assisted by AI."}
              </p>

              {/* Supporting copy */}
              <p className={styles.subheading}>
                {bannerdata?.heading?.desc}
              </p>

              {/* Core tagline */}
              <p className={styles.coretagline}>
                {bannerdata?.heading?.coreTagline ?? "AI Assists. The Advocate Decides."}
              </p>

              {/* Benefits list */}
              <div className={styles.bannerpoint}>
                {benefits.map((item, idx) => (
                  <div
                    className={`d-flex gap-3 my-3 align-items-start ${styles.pointwise}`}
                    key={item?.id ?? idx}
                  >
                    <DynamicIcon name="circle-check" color="#b20a0a" size={22} aria-hidden="true" />
                    <span>{item?.desc}</span>
                  </div>
                ))}
              </div>

              {/* Secondary CTA — mobile only, below copy */}
              <div className={`${styles.secondarycta} d-lg-none`}>
                <button
                  className={styles.ctasecondary}
                  onClick={() =>
                    document
                      .getElementById("what-learn")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore What You'll Learn
                </button>
              </div>
            </div>
          </div>

          <div className={`col-xl-5 col-lg-6 col-12 ${styles.formcol}`}>
            <div ref={contactFormRef}>
              <ContactForm ipAddress={ipName} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

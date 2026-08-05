import Button from "@/common/Button";
import styles from "./styles.module.css";
import Title from "@/common/Title";
import { programConfig } from "@/constants/Home";
import { getSectionCtaText } from "@/utils/programStatus";

const WhyCourse = ({ scrollToContactForm }) => {
  return (
    <section className={styles.whycouresec} id="why-course">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className={styles.course}>
              <Title
                title1={"Why This"}
                spantitle={"Masterclass?"}
              />

              <p className="my-4">
                Law school gives you theory. Decoding of Practice gives you
                the workflow. Whether you aim to become a practicing advocate,
                a judge, or a corporate lawyer — this masterclass teaches you
                how legal work actually moves, from the first client
                conversation to courtroom preparation.
              </p>

              <p className={styles.aitag}>
                Now enhanced with responsible AI assistance — so you can work
                with greater clarity, structure and speed, while retaining full
                professional judgment.
              </p>

              <div className={styles.tagline}>
                AI Assists. The Advocate Decides.
              </div>

              <Button
                name={getSectionCtaText(programConfig, "Reserve Your Seat")}
                scrollToContactForm={scrollToContactForm}
              />
            </div>
          </div>

          <div className="col-lg-6 mt-5 mt-lg-0">
            <div className={styles.courseimg}>
              {/* Preserved existing asset: /assets/home/whycourse.jpeg */}
              <img
                src={"/assets/home/whycourse.jpeg"}
                alt="Advocates in a courtroom setting — VLS Law Academy"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyCourse;

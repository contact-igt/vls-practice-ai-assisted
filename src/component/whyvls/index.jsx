import Title from "@/common/Title";
import { DynamicIcon } from "lucide-react/dynamic";
import styles from "./styles.module.css";
import Button from "@/common/Button";

const WhyVls = ({ whyvlsdata, scrollToContactForm }) => {
  return (
    <section className={styles.WhyVlssec}>
      <div className="container">
        <div className="row  ">
          <div className="col-lg-6">
            <Title title1={"Practical legal education for"} spantitle={"the work law school didn't teach."} />

            <div className="py-4">
              {whyvlsdata?.map((data, i) => (
                <div
                  key={i}
                  className={`${styles.learnpt} d-flex gap-3 align-items-center my-4`}
                >
                  <DynamicIcon name="gavel" size={25} color="#b20a0a" />
                  <h5>{data}</h5>
                </div>
              ))}
            </div>

            <Button
              name={"Register Now"}
              scrollToContactForm={scrollToContactForm}
            />
          </div>

          <div className="col-lg-6 mt-5 mt-lg-0">
            <div className={styles.learnimg}>
              <img src={"/assets/home/IMG_9237.jpg"} className="img-fluid" alt="VLS Law Academy practitioners and students" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyVls;

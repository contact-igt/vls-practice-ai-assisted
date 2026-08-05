import Title from "@/common/Title";
import styles from "./styles.module.css";
import { programConfig } from "@/constants/Home";
import {
  DATE_TIME_ANNOUNCEMENT_TEXT,
  PRICE_ANNOUNCEMENT_TEXT,
  isRegistrationOpen,
} from "@/utils/programStatus";

const FAQ = ({ faqdata }) => {
  const registrationOpen = isRegistrationOpen(programConfig);

  const getAnswer = (item) => {
    if (registrationOpen) return item.answer;
    if (item.question === "What is the fee?") return PRICE_ANNOUNCEMENT_TEXT;
    if (item.question === "When is the next session?") {
      return DATE_TIME_ANNOUNCEMENT_TEXT;
    }
    return item.answer;
  };

  return (
    <section className={styles.faqsec}>
      <div className="container">
        <div className="d-flex justify-content-center">
          <Title
            title1={"Common"}
            spantitle={"Questions"}
            title2={"about the masterclass"}
          />
        </div>

        <div className="accordion mt-5" id="faqAccordion">
          {faqdata.map((item, i) => (
            <div className="accordion-item" key={i}>
              <h2 className={`accordion-header ${styles.faquestion}`} id={`heading${item.id}`}>
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${item.id}`}
                  aria-expanded="false"
                  aria-controls={`collapse${item.id}`}
                >
                  {item.question}
                </button>
              </h2>
              <div
                id={`collapse${item.id}`}
                className="accordion-collapse collapse"
                aria-labelledby={`heading${item.id}`}
                data-bs-parent="#faqAccordion"
              >
                <div className={` accordion-body ${styles.faqanswer}`}>{getAnswer(item)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
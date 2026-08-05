import { DynamicIcon } from "lucide-react/dynamic";
import styles from "./styles.module.css";

/**
 * PracticeGap — answers the four key advertising hooks
 * Uses existing photo /assets/home/fatsfact.jpeg (moved here since FastFact already uses it there)
 */
const PracticeGap = ({ gapdata }) => {
  const cards = gapdata?.cards ?? [];

  return (
    <section className={styles.gapsec} id="practice-gap" aria-labelledby="gap-heading">
      <div className="container">
        <div className={styles.gaplabel} aria-hidden="true">
          {gapdata?.label ?? "THE PRACTICE GAP"}
        </div>
        <h2 className={styles.gapheading} id="gap-heading">
          {gapdata?.heading ?? "The degree taught you law. Practice demands a workflow."}
        </h2>

        <div className="row mt-5 g-4">
          {cards.map((card) => (
            <div className="col-lg-6" key={card.id}>
              <div className={styles.gapcard}>
                <div className={styles.gapcardicon} aria-hidden="true">
                  <DynamicIcon name={card.icon} size={28} color="#b20a0a" />
                </div>
                <div className={styles.gapcardcontent}>
                  <h3 className={styles.gapcardq}>{card.question}</h3>
                  <p className={styles.gapcarda}>{card.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PracticeGap;

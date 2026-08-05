import { DynamicIcon } from "lucide-react/dynamic";
import styles from "./styles.module.css";

/**
 * AIvsAdvocate — clearly separates what AI can assist with vs. what the advocate controls
 */
const AIvsAdvocate = ({ aidata }) => {
  const aiCan = aidata?.ai_can ?? [];
  const advocateMust = aidata?.advocate_must ?? [];

  return (
    <section className={styles.aivsec} id="ai-vs-advocate" aria-labelledby="aiva-heading">
      <div className="container">
        <h2 className={styles.aivaheading} id="aiva-heading">
          {aidata?.heading ?? "Use AI for assistance. Keep legal judgment with the advocate."}
        </h2>

        <div className="row g-4 mt-3">
          {/* AI Can Assist */}
          <div className="col-lg-6">
            <div className={styles.aicard}>
              <div className={styles.aicardheader}>
                <DynamicIcon name="bot" size={22} color="#b20a0a" aria-hidden="true" />
                <h3 className={styles.aicardtitle}>AI Can Assist With</h3>
              </div>
              <ul className={styles.ailist} aria-label="What AI can assist with">
                {aiCan.map((item, i) => (
                  <li key={i} className={styles.aiitem}>
                    <DynamicIcon name="check" size={16} color="#b20a0a" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Advocate Must Control */}
          <div className="col-lg-6">
            <div className={`${styles.aicard} ${styles.advocatecard}`}>
              <div className={styles.aicardheader}>
                <DynamicIcon name="scale" size={22} color="#1a1a1a" aria-hidden="true" />
                <h3 className={`${styles.aicardtitle} ${styles.advocatetitle}`}>
                  The Advocate Must Control
                </h3>
              </div>
              <ul className={styles.ailist} aria-label="What the advocate must control">
                {advocateMust.map((item, i) => (
                  <li key={i} className={styles.aiitem}>
                    <DynamicIcon name="gavel" size={16} color="#1a1a1a" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Prominent disclaimer */}
        <div className={styles.disclaimer} role="note">
          <DynamicIcon name="shield-alert" size={20} color="#b20a0a" aria-hidden="true" />
          <p>{aidata?.disclaimer ?? "AI-generated work is a starting point. Professional review is the standard."}</p>
        </div>
      </div>
    </section>
  );
};

export default AIvsAdvocate;

import { DynamicIcon } from "lucide-react/dynamic";
import styles from "./styles.module.css";

const TestimonialCard = ({ imageSrc, openModal, name, testimonial }) => {
  const label = name || "Student testimonial";

  return (
    <div className={styles.testimonialCard}>
      <div className={styles.imageContainer}>
        <img src={imageSrc} alt={label} className={styles.clientImage} />
        <button
          type="button"
          onClick={openModal}
          className={styles.playButton}
          aria-label={`Play ${label} video`}
        >
          <DynamicIcon name="play" fill="#b20a0a" color="#b20a0a" size={32} />
        </button>
      </div>
    </div>
  );
};

export default TestimonialCard;

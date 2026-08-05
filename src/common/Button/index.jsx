import { DynamicIcon } from "lucide-react/dynamic";
import styles from "./styles.module.css";

const Button = ({ name, scrollToContactForm, icon, isLoading, type, link, disabled }) => {
  if (link) {
    return (
      <a disabled={disabled} href={link} className={styles.commonbtn}>
        {icon && <DynamicIcon name={icon} size={20} />}

        {isLoading ? (
          <span
            className="spinner-border spinner-border-sm text-light"
            role="status"
          ></span>
        ) : (
          <span>{name}</span>
        )}
      </a>
    );
  }

  return (
    <button
      type={type || "button"}
      onClick={scrollToContactForm}
      className={styles.commonbtn}
      disabled={disabled}
    >
      {icon && <DynamicIcon name={icon} size={20} />}

      {isLoading ? (
        <span
          className="spinner-border spinner-border-sm text-light"
          role="status"
        ></span>
      ) : (
        <span>{name}</span>
      )}
    </button>
  );
};

export default Button;

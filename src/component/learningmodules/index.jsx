import { useState } from "react";
import { DynamicIcon } from "lucide-react/dynamic";
import Title from "@/common/Title";
import styles from "./styles.module.css";

/**
 * LearningModules — four module accordion with outcomes
 * Uses existing photo /assets/home/IMG_8234 (1).JPEG
 */
const LearningModules = ({ modulesdata }) => {
  const [openId, setOpenId] = useState(1);
  const modules = modulesdata ?? [];

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.modulessec} id="what-learn" aria-labelledby="modules-heading">
      <div className="container">
        <div className="d-flex justify-content-center">
          <Title
            title1={"From the first client brief"}
            spantitle={"to verified legal work."}
          />
        </div>

        <div className="row mt-5 g-4 align-items-start">
          {/* Modules accordion */}
          <div className="col-lg-7">
            <div className={styles.accordion} role="list">
              {modules.map((mod) => {
                const isOpen = openId === mod.id;
                return (
                  <div
                    className={`${styles.modcard} ${isOpen ? styles.modopen : ""}`}
                    key={mod.id}
                    role="listitem"
                  >
                    <button
                      className={styles.modheader}
                      onClick={() => toggle(mod.id)}
                      aria-expanded={isOpen}
                      aria-controls={`module-body-${mod.id}`}
                      id={`module-header-${mod.id}`}
                    >
                      <span className={styles.modnum} aria-hidden="true">
                        Module {mod.id}
                      </span>
                      <span className={styles.modtitle}>{mod.title}</span>
                      <DynamicIcon
                        name={isOpen ? "chevron-up" : "chevron-down"}
                        size={18}
                        color={isOpen ? "#fff" : "#b20a0a"}
                        aria-hidden="true"
                      />
                    </button>

                    <div
                      id={`module-body-${mod.id}`}
                      role="region"
                      aria-labelledby={`module-header-${mod.id}`}
                      className={styles.modbody}
                      hidden={!isOpen}
                    >
                      <ul className={styles.topicslist}>
                        {mod.topics.map((topic, i) => (
                          <li key={i} className={styles.topicitem}>
                            <DynamicIcon
                              name="circle-check"
                              size={16}
                              color="#b20a0a"
                              aria-hidden="true"
                            />
                            <span>{topic}</span>
                          </li>
                        ))}
                      </ul>
                      <div className={styles.outcome} role="note">
                        <strong>Outcome:</strong> {mod.outcome}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preserved existing asset: /assets/home/IMG_8234 (1).JPEG */}
          <div className="col-lg-5 d-none d-lg-block">
            <div className={styles.modimg}>
              <img
                src={"/assets/home/IMG_8234 (1).JPEG"}
                alt="VLS Law Academy — Decoding of Practice classroom session"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Mobile image — visible only on smaller screens */}
        <div className="d-lg-none mt-4">
          <div className={styles.modimgmobile}>
            <img
              src={"/assets/home/IMG_8234 (1).JPEG"}
              alt="VLS Law Academy — Decoding of Practice classroom session"
              loading="lazy"
              className="img-fluid"
              style={{ borderRadius: "14px", width: "100%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningModules;

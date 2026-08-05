import React from "react";
import styles from "./styles.module.css";
import { programConfig } from "@/constants/Home";

const RegisterSticky = ({ scrollToContactForm }) => {
  const sessionDisplay =
    programConfig.sessionStatus === "announced" && programConfig.date
      ? `${programConfig.date} - ${programConfig.time}`
      : "Next live session - date to be announced";

  return (
    <div
      className={styles.bottomfix}
      role="complementary"
      aria-label="Quick registration"
    >
      <div className="container">
        <div className="row py-lg-3 py-2 align-items-center">
          <div className="col-lg-7 d-lg-block d-none">
            <div className={styles.meuntitle}>
              <h4>Decoding of Practice - AI-Assisted Legal Practice Masterclass</h4>
              <p className={styles.sessioninfo}>{sessionDisplay}</p>
            </div>
          </div>
          <div className="col-lg-5 col-md-12">
            <div className={styles.actionRow}>
              <div
                className={styles.priceWrap}
                aria-label={`Price INR 999 discounted to INR ${programConfig.fee}`}
              >
                <p className={styles.pricing}>
                  <span>{`INR \u20B9999`}</span>
                  <strong>{`INR \u20B9${programConfig.fee}`}</strong>
                </p>
                <p className={styles.mobilePricing}>
                  <span>{`INR \u20B9999`}</span>
                  <strong>{`INR \u20B9${programConfig.fee}`}</strong>
                </p>
              </div>
              <div className={styles.pricebtn}>
                <button
                  type="button"
                  onClick={scrollToContactForm}
                  className="btn text-light"
                  style={{ cursor: "pointer", borderRadius: "20px" }}
                  aria-label="Reserve your seat - Decoding of Practice"
                >
                  Register Here
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterSticky;
import React from "react";
import styles from "./styles.module.css";
import { programConfig } from "@/constants/Home";

const RegisterSticky = ({ scrollToContactForm }) => {
  const sessionDisplay =
    programConfig.sessionStatus === "announced" && programConfig.date
      ? `${programConfig.date} · ${programConfig.time}`
      : "Next live session — date to be announced";

  return (
    <>
      <div className={styles.bottomfix} role="complementary" aria-label="Quick registration">
        <div className="container">
          <div className="row py-lg-3 py-2 align-items-center">
            <div className="col-lg-7 d-lg-block d-none">
              <div className={styles.meuntitle}>
                <h4>Decoding of Practice — AI-Assisted Legal Practice Masterclass</h4>
                <p className={styles.sessioninfo}>{sessionDisplay}</p>
              </div>
            </div>
            <div className="col-lg-5 col-md-12">
              <div className="pricing d-flex justify-content-lg-end justify-content-between align-items-center gap-3 py-md-1 py-2">
                <div>
                  <p className={styles.pricing}>
                    ₹{programConfig.fee}
                  </p>
                  <p className={styles.mbinfo} aria-hidden="true">
                    {sessionDisplay}
                  </p>
                </div>
                <div className={styles.pricebtn}>
                  <button
                    onClick={scrollToContactForm}
                    className="btn text-light"
                    style={{ cursor: "pointer", borderRadius: "20px" }}
                    aria-label="Reserve your seat — Decoding of Practice"
                  >
                    Reserve Your Seat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterSticky;

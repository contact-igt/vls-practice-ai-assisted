import Title from "@/common/Title";
import styles from "./styles.module.css";
import { DynamicIcon } from "lucide-react/dynamic";
import { programConfig } from "@/constants/Home";
import {
  DATE_TIME_ANNOUNCEMENT_TEXT,
  PRICE_ANNOUNCEMENT_TEXT,
  isRegistrationOpen,
} from "@/utils/programStatus";

const FastFact = ({ factdata }) => {
  const registrationOpen = isRegistrationOpen(programConfig);

  const getFactValue = (data) => {
    if (registrationOpen) return data?.value;
    if (data?.icon === "calendar-clock") return DATE_TIME_ANNOUNCEMENT_TEXT;
    if (data?.icon === "hand-coins") return PRICE_ANNOUNCEMENT_TEXT;
    return data?.value;
  };

  return (
    <section className={styles.factsec}>
      <div className="container">
        <div className="d-flex justify-content-center">
          <Title title1={"At a"} spantitle={"Glance"} subtitle={"What you get when you join this masterclass"} />
        </div>

        <div className="row mt-5">
          <div className="col-lg-6">
            <div className={styles.factimg}>
              <img src={"/assets/home/fatsfact.jpeg"} className="img-fluid" />
            </div>
          </div>
          <div className="col-lg-6 mt-5 mt-lg-0">
            <div className="row">
              {factdata?.map((data, i) => {
                const isPriceCard = data?.icon === "hand-coins";

                return (
                  <div className="col-xxl-6 col-xl-12" key={i}>
                    <div
                      className={`d-flex align-items-center my-3 gap-3 ${
                        styles.factpointcard
                      } ${isPriceCard ? styles.priceFactCard : ""}`}
                    >
                      <div className={styles.cardimg}>
                        <DynamicIcon
                          name={data?.icon}
                          color="#b20a0a"
                          size={30}
                        />
                      </div>
                      <p>{getFactValue(data)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FastFact;
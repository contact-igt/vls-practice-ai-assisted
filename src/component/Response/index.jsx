import Button from "@/common/Button";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";

const Response = () => {
  const [userDetail, setUserDetail] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const { query, isReady, asPath } = router;
  const routePath = asPath?.split("?")?.[0];
  const issuccess =
    mounted &&
    isReady &&
    (query.response === "thank-you" || routePath === "/thank-you");
  const isWaitlist = userDetail?.payment_status === "waitlist";

  useEffect(() => {
    setMounted(true);

    try {
      const storedData = localStorage.getItem("PaymentDetails");

      if (storedData) {
        setUserDetail(JSON.parse(storedData));
      } else {
        setUserDetail(null);
      }
    } catch (error) {
      console.error("Invalid PaymentDetails in localStorage", error);
      localStorage.removeItem("PaymentDetails");
      setUserDetail(null);
    }
  }, []);

  if (!mounted || !isReady) {
    return (
      <section className={`pt-5 mt-5 ${styles.responseSection}`}>
        <div className="container text-center">
          <p>Loading status...</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`pt-5 mt-5 ${styles.responseSection}`}>
      <div className="container">
        <div className={`text-center ${styles.responseIcon}`}>
          <Image
            src={
              issuccess
                ? "/assets/Response/success.png"
                : "/assets/Response/error.png"
            }
            alt="icon"
            width={120}
            height={120}
            priority
          />
        </div>

        <div className={`text-center ${styles.responseInfo}`}>
          <h5 className={issuccess ? styles.successText : styles.errorText}>
            {issuccess
              ? isWaitlist
                ? "Thank You"
                : "Payment Successful"
              : "Payment Failed"}
          </h5>

          {issuccess ? (
            <>
              <p>
                {isWaitlist
                  ? "Thank you! Your details have been added to the waitlist."
                  : "Thank you! Your payment has been received successfully. Below are your transaction details:"}
              </p>

              {userDetail ? (
                <div className={styles.summaryBox}>
                  <p>
                    <strong>Name:</strong> {userDetail?.name || ""}
                  </p>
                  <p>
                    <strong>Email:</strong> {userDetail?.email || "-"}
                  </p>
                  <p>
                    <strong>Mobile:</strong> {userDetail?.mobile || "-"}
                  </p>
                  {!isWaitlist && (
                    <>
                      <p>
                        <strong>Amount:</strong> {`\u20B9${userDetail?.amount || "-"}`}
                      </p>
                      <p>
                        <strong>Transaction ID:</strong>{" "}
                        {userDetail?.razorpay_payment_id || "Not Available"}
                      </p>
                    </>
                  )}
                </div>
              ) : (
                ""
              )}
            </>
          ) : (
            <p>
              Oops! We couldn\u2019t process your payment. Please try again or call
              us directly for support.
            </p>
          )}
        </div>

        <div
          className={`d-flex flex-md-row flex-column justify-content-center gap-3 ${styles.responseCta}`}
        >
          <Button name={"Back to Home"} link={"/"} icon={"arrow-left"} />
          {!issuccess && (
            <Button
              name={"Call Support"}
              link={"tel:+919500207811"}
              icon={"phone"}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Response;
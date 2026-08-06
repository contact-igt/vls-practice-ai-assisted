"use client";

import Button from "@/common/Button";
import styles from "./styles.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Title from "@/common/Title";
import { HomePage, programConfig } from "@/constants/Home";
import { useRouter } from "next/router";
import { useState } from "react";
import { Popup } from "@/common/Popup";
import { AcademyRegisterQuery } from "@/hooks/useAcademyTrainingQuery";
import {
  PRICE_ANNOUNCEMENT_TEXT,
  isRegistrationOpen,
} from "@/utils/programStatus";

const ContactForm = ({ ipAddress }) => {
  const router = useRouter();
  const { mutate: registerMutate } = AcademyRegisterQuery();

  const [instructionOpen, setInstructionOpen] = useState(false);
  const [agree, setAgree] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [formValues, setFormValues] = useState(null);

  const registrationOpen = isRegistrationOpen(programConfig);
  const formTitle = registrationOpen ? "Reserve" : "Join";
  const formSpanTitle = registrationOpen ? "Your Seat" : "Waitlist";
  const formSubtitle = registrationOpen
    ? `Decoding of Practice \u2014 \u20B9${programConfig.fee}`
    : `Decoding of Practice \u2014 ${PRICE_ANNOUNCEMENT_TEXT}`;

  const getUTM = (key) => {
    if (typeof window === "undefined") return "";
    try {
      return localStorage.getItem(key) || "";
    } catch {
      return "";
    }
  };

  const getProgramDate = () =>
    isRegistrationOpen(programConfig) && programConfig.date
      ? programConfig.date
      : "TBA";

  const createBasePayload = (values) => ({
    name: values?.name || "",
    email: values?.email || "",
    mobile: `+91${values?.mobile || ""}`,
    programm_date: getProgramDate(),
    page_name: "decoding-of-practice",
    ip_address: ipAddress || "",
    client_key: "vls_law",
    utm_source: getUTM("utm_source"),
    utm_medium: getUTM("utm_medium"),
    utm_campaign: getUTM("utm_campaign"),
    utm_term: getUTM("utm_term"),
    utm_content: getUTM("utm_content"),
  });

  const submitWaitlist = async (values) => {
    setProcessing(true);

    const apiPayload = {
      ...createBasePayload(values),
      amount: 0,
      razorpay_order_id: "",
      razorpay_payment_id: "",
      razorpay_signature: "",
      payment_status: "waitlist",
      captured: "",
    };

    try {
      await registerUserToDB(apiPayload);
    } catch (err) {
      console.error("Database registration failed for waitlist:", err);
    }
    await safeSetPaymentDetails(apiPayload);

    const params = new URLSearchParams();
    Object.keys(apiPayload).forEach((key) =>
      params.append(key, apiPayload[key] ?? "")
    );

    const sheetSaved = await handleGoogleSheetForm(params);
    if (!sheetSaved) {
      console.error("Google Sheet waitlist submission failed");
    }

    window.location.href = "/thank-you";
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().matches(/^[a-zA-Z ]*$/, "Invalid name"),
      email: Yup.string()
        .required("Email required")
        .email("Enter valid email")
        .test(
          "lowercase",
          "Email must be lowercase",
          (v) => !v || v === v.toLowerCase()
        ),
      mobile: Yup.string()
        .required("Mobile required")
        .matches(/^[0-9]{10}$/, "Invalid mobile number"),
    }),

    onSubmit: async (values) => {
      setFormValues(values);

      if (!isRegistrationOpen(programConfig)) {
        await submitWaitlist(values);
        return;
      }

      setAgree(false);
      setInstructionOpen(true);
    },
  });

  const openRazorpay = async () => {
    if (!formValues) return;

    if (!isRegistrationOpen(programConfig)) {
      await submitWaitlist(formValues);
      return;
    }

    let order;

    try {
      const resp = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: HomePage?.razorpay?.amount }),
      });

      order = await resp.json();

      if (!resp.ok) {
        router.replace("/error");
        return;
      }
    } catch (error) {
      console.error("Unable to create Razorpay order", error);
      router.replace("/error");
      return;
    }

    if (typeof window === "undefined" || !window.Razorpay) {
      console.error("Razorpay checkout script is not available");
      router.replace("/error");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_Ss2NFtpJFLRAiw",
      amount: order.amount,
      currency: order.currency,
      name: formValues.name,
      order_id: order.id,
      description: `${HomePage?.razorpay?.title} - \u20B9${HomePage?.razorpay?.amount}`,

      handler: async (response) => {
        if (!response?.razorpay_payment_id) {
          router.replace("/error");
          return;
        }

        setProcessing(true);

        const apiPayload = {
          ...createBasePayload(formValues),
          amount: order?.amount / 100,
          razorpay_order_id: response.razorpay_order_id || "",
          razorpay_payment_id: response.razorpay_payment_id || "",
          razorpay_signature: response.razorpay_signature || "",
          payment_status: "paid",
          captured: response?.captured ? String(response.captured) : "true",
        };

        try {
          await registerUserToDB(apiPayload);
        } catch (err) {
          console.error("Database registration failed after payment:", err);
        }
        await safeSetPaymentDetails(apiPayload);

        const sessionDate =
          programConfig.sessionStatus === "announced" && programConfig.date
            ? programConfig.date
            : "Date to be announced";

        // try {
        //   await handleWhatsappMessage(
        //     `91${formValues.mobile}`,
        //     formValues.name,
        //     programConfig.fee,
        //     "Decoding of Practice - AI-Assisted Legal Practice Masterclass",
        //     sessionDate,
        //     programConfig.mode,
        //     sessionDate
        //   );
        // } catch (error) {
        //   console.error("WhatsApp notification failed after payment", error);
        // }

        const params = new URLSearchParams();
        Object.keys(apiPayload).forEach((key) =>
          params.append(key, apiPayload[key] ?? "")
        );

        const sheetSaved = await handleGoogleSheetForm(params);
        if (!sheetSaved) {
          console.error("Google Sheet registration failed after payment");
        }

        window.location.href = "/thank-you";
      },

      prefill: {
        name: formValues.name,
        email: formValues.email,
        contact: formValues.mobile,
      },

      theme: { color: "#b20a0a" },
    };

    const razor = new window.Razorpay(options);

    razor.on("payment.failed", () => {
      router.replace("/error");
    });

    razor.open();
  };

  const registerUserToDB = (payload) =>
    new Promise((resolve, reject) => {
      registerMutate(
        { value: payload },
        {
          onSuccess: resolve,
          onError: reject,
        }
      );
    });

  const handleWhatsappMessage = async (
    phone,
    name,
    amount,
    program,
    schedule,
    platform,
    date
  ) => {
    await fetch("/api/sendWhatsapp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone,
        name,
        amount,
        programm_name: program,
        schedule,
        platform,
        link_date: date,
      }),
    });
  };

  const handleGoogleSheetForm = async (formData, retries = 3, delay = 1500) => {
    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbx130nzdo6NT9hq_szOSMcIR7AbSLL7MCfL_7ho9pHOOvFyYlDybVhBSEW-19xm0X65/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: formData.toString(),
        }
      );
      const text = await res.text();
      console.log("Google Sheet Response:", text);
      if (res.ok) {
        return true;
      }
      throw new Error("Sheet responded with non-OK");
    } catch (err) {
      console.error(
        `Google Sheet attempt failed. Retries left: ${retries}, err `
      );
      if (retries <= 1) {
        console.error("Google Sheet failed permanently!");
        return false;
      }
      await new Promise((resolve) => setTimeout(resolve, delay));
      return handleGoogleSheetForm(formData, retries - 1, delay);
    }
  };

  const safeSetPaymentDetails = async (data) => {
    if (typeof window === "undefined") return;

    try {
      const safeData = JSON.stringify(data);
      localStorage.setItem("PaymentDetails", safeData);
    } catch (error) {
      console.error("Failed to store PaymentDetails:", error);
    }
  };

  return (
    <>
      <div className={styles?.formcardbottom} id="contact_form">
        <form
          id="contactForm"
          className="contact-form"
          onSubmit={formik.handleSubmit}
        >
          <div className={styles.formtitle}>
            <Title
              title1={formTitle}
              spantitle={formSpanTitle}
              subtitle={formSubtitle}
            />
          </div>
          <div className={styles.inputgrp}>
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <small style={{ fontSize: "12px" }}>{formik.errors.name}</small>
            )}
          </div>

          <div className={styles.inputgrp}>
            <label>
              Email<span>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <small style={{ fontSize: "12px" }}>{formik.errors.email}</small>
            )}
          </div>

          <div className={styles.inputgrp}>
            <label>
              Mobile<span>*</span>
            </label>
            <div className="position-relative">
              <input
                type="text"
                className={`${styles.inputmobile} form-control `}
                placeholder="Mobile"
                {...formik.getFieldProps("mobile")}
              />
              <input
                className={`${styles.inputmobilecode} form-control position-absolute`}
                readOnly
                value={"+91"}
              />
            </div>
            {formik.touched.mobile && formik.errors.mobile && (
              <small style={{ fontSize: "12px" }}>{formik.errors.mobile}</small>
            )}
          </div>

          <div className={`mt-4 d-md-flex justify-content-center`}>
            <Button
              name={registrationOpen ? "SUBMIT" : "JOIN WAITLIST"}
              type={"submit"}
              disabled={processing}
            />
          </div>
        </form>
      </div>

      <Popup open={instructionOpen} onClose={() => setInstructionOpen(false)}>
        <div className={styles.loadingPopup}>
          <h4>{'\u26A0\uFE0F'} Important Payment Instruction</h4>

          <h6>
            After completing the payment, please wait until you are redirected
            to the success page. Do not close or refresh this page.
          </h6>

          <p className="text-danger fw-semibold mt-2">
            If you close or refresh this page during payment, your registration
            details may not be recorded.
          </p>

          <div className="form-check mt-3 d-flex justify-content-center gap-2">
            <input
              type="checkbox"
              className="form-check-input custom-red-checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              id="agree"
            />
            <label
              className="form-check-label text-danger fw-bold"
              htmlFor="agree"
              style={{ fontSize: "14px", marginTop: "2px" }}
            >
              I understand and agree.
            </label>
          </div>

          <div
            className={`d-flex flex-md-row flex-column flex-column-reverse gap-3 mt-4 ${styles.instructionbtn}`}
          >
            <button
              className="btn btn-secondary"
              onClick={() => setInstructionOpen(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger"
              disabled={!agree}
              onClick={() => {
                setInstructionOpen(false);
                openRazorpay();
              }}
            >
              I Agree & Pay
            </button>
          </div>
        </div>
      </Popup>

      <Popup open={processing} closeOnOutsideClick={false}>
        <div className={styles.loadingPopup}>
          <h4>
            {'\u26A0\uFE0F'}{" "}
            {registrationOpen ? "Processing Payment" : "Submitting Details"}
          </h4>
          <p>Please wait. Do not close or refresh this page.</p>
        </div>
      </Popup>
    </>
  );
};

export default ContactForm;
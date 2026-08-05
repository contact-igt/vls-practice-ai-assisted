import { MetaTitle } from "@/common/Meta/MetaTitle";
import Banner from "@/component/banner";
import FastFact from "@/component/fastfact";
import Promise from "@/component/promise";
import { HomePage } from "@/constants/Home";
import { useEffect, useRef, useState } from "react";
import Speaker from "@/component/speaker";
import FAQ from "@/component/faq";
import RegisterSticky from "@/common/RegisterSticky";
import WhoJoin from "@/component/whoJoin";
import WhyCourse from "@/component/whycourse";
import WhatLearn from "@/component/whatlearn";
import WhyVls from "@/component/whyvls";
import Testimonial from "@/component/testimonial";
import PracticeGap from "@/component/practicegap";
import WorkflowFlow from "@/component/workflowflow";
import AIvsAdvocate from "@/component/aivsadvocate";
import LearningModules from "@/component/learningmodules";

const HomePageComponent = () => {
  const contactFormRef = useRef(null);
  const [ipid, setipid] = useState("");

  const scrollToContactForm = () => {
    contactFormRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getIpAddress = async () => {
    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();
      setipid(ipData.ip);
    } catch {
      // silently fail — IP is optional
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.removeItem("PaymentDetails");
    getIpAddress();
  }, []);

  return (
    <>
      <MetaTitle />

      {/* 1. Hero — Decoding of Practice + AI descriptor + Registration Form */}
      <Banner
        bannerdata={HomePage?.hero_banner}
        contactFormRef={contactFormRef}
        ipName={ipid}
      />

      {/* 2. At a Glance — session facts (uses fatsfact.jpeg) */}
      <FastFact factdata={HomePage?.fast_fact} />

      {/* 3. Why This Masterclass (uses whycourse.jpeg) */}
      <WhyCourse scrollToContactForm={scrollToContactForm} />

      {/* 4. The Practice Gap — answers 4 advertising hooks */}
      <PracticeGap gapdata={HomePage?.practice_gap} />

      {/* 5. The Practical Workflow — 8-step legal workflow */}
      <WorkflowFlow workflowdata={HomePage?.workflow} />

      {/* 6. AI vs Advocate — responsibility split */}
      <AIvsAdvocate aidata={HomePage?.ai_vs_advocate} />

      {/* 7. You Got The Degree — promise section */}
      <Promise
        promisedata={HomePage?.promise}
        scrollToContactForm={scrollToContactForm}
      />

      {/* 8. Learning Modules — 4 modules (uses IMG_8234 photo) */}
      <LearningModules modulesdata={HomePage?.modules} />

      {/* 9. What You'll Learn (uses whatlearn.jpeg) */}
      <WhatLearn learndata={HomePage?.what_learn} />

      {/* 10. Faculty (uses mr-siva-kumar-backdrop.svg) */}
      <Speaker speakerdata={HomePage?.speaker} />

      {/* 11. Who Should Attend (uses whojoin.jpeg) */}
      <WhoJoin
        whojoindata={HomePage?.who_join}
        scrollToContactForm={scrollToContactForm}
      />

      {/* 12. Why VLS Law Academy (uses IMG_9237.jpg) */}
      <WhyVls
        whyvlsdata={HomePage?.whyvls}
        scrollToContactForm={scrollToContactForm}
      />

      {/* 13. Video Testimonials — locked, preserved exactly */}
      <Testimonial scrollToContactForm={scrollToContactForm} />

      {/* 14. FAQs */}
      <FAQ faqdata={HomePage?.faqs} />

      {/* Sticky bottom bar — no fake countdown */}
      <RegisterSticky scrollToContactForm={scrollToContactForm} />
    </>
  );
};

export default HomePageComponent;

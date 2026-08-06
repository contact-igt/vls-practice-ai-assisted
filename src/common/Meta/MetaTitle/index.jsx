import Head from "next/head";
import React from "react";
import { programConfig } from "@/constants/Home";
import { isRegistrationOpen } from "@/utils/programStatus";

export const MetaTitle = ({ title, description, keywords }) => {
  const defaultTitle =
    "Decoding of Practice \u2014 AI-Assisted Legal Practice Masterclass | VLS Law Academy";
  const defaultDescription =
    "Learn practical legal workflow, client handling, case analysis, drafting, filing and responsible AI-assisted legal practice with VLS Law Academy.";
  const defaultKeywords =
    "Decoding of Practice, VLS Law Academy, legal practice masterclass, AI-assisted law, advocate workflow, legal drafting, court filing, client intake, Tamil Nadu lawyers, legal training Chennai";

  const ogImage = "https://decodingofpractice.vlslawacademy.com/assets/home/banner-img.jpg";
  const canonical = "https://decodingofpractice.vlslawacademy.com/";
  const registrationOpen = isRegistrationOpen(programConfig);

  const courseStructuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Decoding of Practice \u2014 AI-Assisted Legal Practice Masterclass",
    description:
      "A practical legal workflow masterclass covering client intake, case analysis, drafting, filing, courtroom preparation and responsible AI-assisted legal practice.",
    provider: {
      "@type": "Organization",
      name: "VLS Law Academy",
      sameAs: "https://www.vlslawacademy.com/",
    },
    courseMode: "Online",
    inLanguage: ["en", "ta"],
    ...(registrationOpen
      ? {
          offers: {
            "@type": "Offer",
            price: String(programConfig.fee),
            priceCurrency: "INR",
          },
        }
      : {}),
  };

  return (
    <Head>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="VLS Law Academy" />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={ogImage} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(courseStructuredData),
        }}
      />
    </Head>
  );
};
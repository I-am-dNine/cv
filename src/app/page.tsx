import { Metadata } from "next";
import { RESUME_DATA } from "@/data/resume-data";
import { ResumeBuilder } from "./components/ResumeBuilder";

export const metadata: Metadata = {
  title: `${RESUME_DATA.name} - Resume`,
  description: RESUME_DATA.about,
  openGraph: {
    title: `${RESUME_DATA.name} - Resume`,
    description: RESUME_DATA.about,
    type: "profile",
    locale: "en_US",
    images: [
      {
        url: "https://cv.jarocki.me/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${RESUME_DATA.name}'s profile picture`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${RESUME_DATA.name} - Resume`,
    description: RESUME_DATA.about,
    images: ["https://cv.jarocki.me/opengraph-image"],
  },
};

export default function ResumePage() {
  return <ResumeBuilder initialData={RESUME_DATA} />;
}

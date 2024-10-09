import { Metadata } from "next";

export const BASE_METADATA: Metadata = {
  title: {
    template: "%s | Next.js",
    default: "Next.js",
  },
  description: "This is a description",
  openGraph: {
    title: {
      template: "%s | Next.js",
      default: "Next.js",
    },
    description: "This is a description",
    locale: "vi-VN",
    type: "website",
  },
};

import { MetadataRoute } from "next";
import envConfig from "@/configs/environment";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${envConfig.NEXT_PUBLIC_URL}/sitemap.xml`,
  };
}

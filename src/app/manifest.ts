import { MetadataRoute } from "next";
import { AppDescriptionLong, AppName, AppTitle } from "../../const";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: AppTitle,
    short_name: AppName,
    description: AppDescriptionLong,
    start_url: "/",
    display: "standalone",
    background_color: "#052E14",
    theme_color: "#052E14",
    icons: [
      {
        src: "/icon/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

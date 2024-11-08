import { MetadataRoute } from "next";
import { AppDescriptionShort, AppName, AppTitle } from "../../const";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: AppTitle,
    short_name: AppName,
    description: AppDescriptionShort,
    start_url: "/",
    display: "standalone",
    background_color: "#052E14",
    theme_color: "#052E14",
    "icons": [
      {
        "src": "/icon/web-app-manifest-192x192.png",
        "sizes": "192x192",
        "type": "image/png"
      },
      {
        "src": "/icon/web-app-manifest-512x512.png",
        "sizes": "512x512",
        "type": "image/png"
      },
      {
        "purpose": "maskable",
        "sizes": "48x48",
        "src": "/icon/maskable_icon_x48.png",
        "type": "maskable"
      },
      {
        "purpose": "maskable",
        "sizes": "72x72",
        "src": "/icon/maskable_icon_x72.png",
        "type": "maskable"
      },
      {
        "purpose": "maskable",
        "sizes": "96x96",
        "src": "/icon/maskable_icon_x96.png",
        "type": "maskable"
      }
    ],
    "orientation": "portrait",
    "lang": "en",
    "display_override": [
      "window-controls-overlay",
      "standalone"
    ],
    "shortcuts": [
      {
        "name": "Category",
        "url": "https://fintraz.vercel.app/category",
        "description": "Direct Access to Your Categories"
      }
    ],
    "categories": [
      "finance",
      "utilities"
    ]
    // screenshots: [
    //   {
    //     src: "https://i.pinimg.com/originals/a9/88/c1/a988c1bf6e66482d5292e2c0c52f2dde.gif",
    //     sizes: "320x640",
    //     type: "image/gif",
    //     form_factor: "narrow",
    //   },
    //   {
    //     src: "/images/ogimage.png",
    //     sizes: "1200x631",
    //     type: "image/png",
    //     form_factor: "wide",
    //   },
    // ],
  };
}

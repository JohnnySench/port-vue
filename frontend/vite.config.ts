import { resolve } from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import vueDevTools from "vite-plugin-vue-devtools"
import { VitePWA, type ManifestOptions } from "vite-plugin-pwa"

// https://vite.dev/config/

const manifest: Partial<ManifestOptions> = {
  theme_color: "#8936FF",
  background_color: "#2EC6FE",
  icons: [
    { purpose: "maskable", sizes: "512x512", src: "icon512_maskable.png", type: "image/png" },
    { purpose: "any", sizes: "512x512", src: "icon512_rounded.png", type: "image/png" },
  ],
  screenshots: [
    {
      src: "/screenshots/desktop.png",
      type: "image/png",
      sizes: "1919x993",
      form_factor: "wide",
    },
    {
      src: "/screenshots/mobile.png",
      type: "image/png",
      sizes: "403x823",
      form_factor: "narrow",
    },
  ],
  orientation: "any",
  display: "standalone",
  lang: "ru-RU",
  name: "Viev",
  short_name: "We",
}

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    VitePWA({
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{html, css, js, ico, png, jpeg, svg}"],
      },
      manifest: manifest,
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@components": resolve(__dirname, "./src/components"),
      "@shared": resolve(__dirname, "./src/shared"),
      "@layouts": resolve(__dirname, "./src/layouts"),
      "@widgets": resolve(__dirname, "./src/widgets"),
      "@features": resolve(__dirname, "./src/features"),
    },
  },
})

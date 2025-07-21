// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Daftarkan modul PWA
  modules: ["@vite-pwa/nuxt", "@pinia/nuxt"],
  
  // Konfigurasi PWA
  pwa: {
    manifest: {
      name: "Aplikasi KeuanganKu",
      short_name: "UangKu",
      description: "Aplikasi untuk mencatat pengeluaran dan tabungan harian.",
      theme_color: "#00DC82",
      background_color: "#ffffff",
      display: "standalone",
      scope: "/",
      start_url: "/",
      icons: [
        // Anda harus membuat ikon-ikon ini nanti
        { src: "icons/icon-144x144.png", sizes: "144x144", type: "image/png" },
        { src: "icons/icon-512x512.png", sizes: "512x512", type: "image/png" }
      ],
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,png,svg,ico}"],
    },
    devOptions: {
      enabled: true,
      type: "module",
    },
  },
})
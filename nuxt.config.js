import i18n from "./docs/i18n";

export default {
  target: "static",
  srcDir: "./docs/",
  generate: {
    dir: "./docs/dist/"
  },
  head: {
    title: "Vue Heroicons",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Vue component to use SVG inline icons from the awesome Heroicons collection."
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }]
  },
  css: [
    "./assets/font.css",
    "./assets/code-light.css",
    "./assets/code-dark.css"
  ],
  components: true, // auto import components
  modules: ["@nuxt/content", ["nuxt-i18n", i18n]],
  buildModules: ["@nuxtjs/tailwindcss", "vue-swatches/nuxt"],
  plugins: ["~/plugins/icons.js"]
};

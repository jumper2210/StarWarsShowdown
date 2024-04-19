const { defineConfig } = require("vite");
const vue = require("@vitejs/plugin-vue");
const path = require("path");

// https://vitejs.dev/config/
module.exports = defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

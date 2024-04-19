const { defineConfig } = require("cypress");
const viteConfig = require("./cypressvite.config");

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}",
    baseUrl: "http://localhost:5173",
  },
  component: {
    specPattern: "src/**/*.{cy,spec}.{js,ts,jsx,tsx}",
    devServer: {
      framework: "vue",
      bundler: "vite",
      viteConfig: viteConfig,
    },
  },
});

// @ts-check
import { defineConfig } from "astro/config";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
  site: "https://tech.bedrockstreaming.com",
  integrations: [pagefind()],
});